"use client";

import styled from "styled-components";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApi } from "../context/ApiContext";
import { useEffect, useState } from "react";
import { logger } from "@/app/services/logger";
//ICONS
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const CartContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const CartItemText = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 30px;
  width: 600px;
`;

const CartItemPrice = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: bold;
`;

const Total = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const BtnCheckout = styled.button`
  margin-top: 10px;
  background: black;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 20px 45px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  &:hover {
    background-color: #333;
  }
`;

const EnDecreaseBtn = styled.div`
  background-color: #f1f1f1;
  height: 60px;
  width: 60px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  cursor: pointer;
`;

const CartItemsWapper = styled.div`
  padding: 30px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 250px;
`;

const CartImage = styled.div`
  border-radius: 10px;
  padding-right: 20px;

  img {
    object-fit: cover;
  }
`;

const Quantity = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 31px;
  padding: 5px;
`;

const PaymentFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 60px);
  padding: 30px 30px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #00000029;
`;

const Subtotal = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #000000;
  padding-bottom: 10px;
`;

const Discount = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 34px;
  color: #c86a61;
  padding-bottom: 20px;
`;

const RemoveItemButton = styled.div`
  cursor: pointer;
`;

const CartPage = () => {
  const cart = useCart();
  const router = useRouter();
  const api = useApi();
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const orderDetails = {
      billedToOrganization: 0,
      userId: null,
      organizationName: null,
    };

    if (api.isAuthenticated()) {
      const user = api.getUser();
      orderDetails.userId = user.id;
      if (user.organization) {
        const organization = user.organization;
        orderDetails.organizationName = organization.name;
        if (organization.payment_via_paycheck) {
          orderDetails.billedToOrganization = cart.total;
        } else if (organization.is_percentage_discount) {
          orderDetails.billedToOrganization =
            cart.cartItems[0].item.price *
            (organization.discount_percentage / 100);
        } else {
          if (cart.total > organization.discount_amount) {
            orderDetails.billedToOrganization = organization.discount_amount;
          } else {
            orderDetails.billedToOrganization = cart.total;
          }
        }
      }
    }

    setOrderDetails(orderDetails);
  }, [cart.total]);

  useEffect(() => {
    if (cart.nonEmpty) {
      return;
    }

    router.push("/");
  }, [cart.nonEmpty]);

  const paymentOptions = {
    currency: "EUR",
  };

  const handlePayment = async () => {
    // If total is billed to organization, we don't need to pay
    if (cart.total === orderDetails.billedToOrganization) {
      const orderItems = cart.cartItems.map((el) => {
        return { amount: el.quantity, food_item_id: el.item.id };
      });
      const order = {
        user_id: orderDetails.userId,
        billed_to_organization: orderDetails.billedToOrganization,
        orderItems,
      };
      api
        .createOrder(order)
        .then((order) => {
          const total = cart.total;
          cart.cleanCart();
          router.push({
            pathname: "/success",
            query: {
              amount: total,
              currency: paymentOptions.currency,
              title: `Abholnummer #${order.pickup_number}`,
            },
          });
        })
        .catch((error) => {
          logger.error("Something went wrong during creation the order", error);
          alert("Something went wrong during creation the order");
          router.push("/error");
        });
    } else {
      // In all other cases, we need to pay using SumUp

      // Get access token
      const token = await api.getSumUpToken();
      try {
        const { isLoggedIn } = await new Promise((resolve, reject) => {
          SumUp.isLoggedIn(resolve, reject);
        });

        if (!isLoggedIn) {
          await new Promise((resolve, reject) =>
            SumUp.login(
              {
                accessToken: token,
                affiliateKey: "sup_afk_orzL8labu6vOwZYc0Fyn6BYrzSKb6os9",
              },
              resolve,
              reject
            )
          );
          logger.info("Logged in to SumUp");
        } else {
          logger.info("Already logged in to SumUp");
        }

        await new Promise((resolve, reject) => SumUp.prepare(resolve, reject));

        SumUp.pay(
          cart.total - orderDetails.billedToOrganization,
          paymentOptions.title,
          paymentOptions.currency,
          (success) => {
            // TODO: Ensure that the order is created
            // TODO: Otherwise, it will be problematic
            // TODO: to refund money without any
            // TODO: information if something goes wrong

            logger.info("Payment successful:", success);
            const orderItems = cart.cartItems.map((el) => {
              return { amount: el.quantity, food_item_id: el.item.id };
            });

            const order = {
              user_id: orderDetails.userId,
              billed_to_organization: orderDetails.billedToOrganization,
              orderItems,
            };

            api
              .createOrder(order)
              .then((order) => {
                const total = cart.total;
                cart.cleanCart();
                router.push({
                  pathname: "/success",
                  query: {
                    amount: total,
                    currency: paymentOptions.currency,
                    title: `Abholnummer #${order.pickup_number}`,
                  },
                });
              })
              .catch((error) => {
                logger.error(
                  "Something went wrong during creation the order",
                  error
                );
                alert("Something went wrong during creation the order");
                router.push("/error");
              });
          },
          (error) => {
            logger.error("Payment failed:", error);
            alert("Payment failed: " + error.message);
            router.push("/error");
          }
        );
      } catch (error) {
        logger.error("SumUp operation failed:", error);
        alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <CartContainer>
      <CartItemsWapper>
        {!cart.nonEmpty ? (
          <p>Ihr Warenkorb ist leer.</p>
        ) : (
          cart.cartItems.map((el, index) => (
            <CartItem key={index}>
              <CartImage>
                <Image
                  src={el.item.image}
                  width={130}
                  height={130}
                  style={{ borderRadius: 5 }}
                  alt={el.item.name}
                />
              </CartImage>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",

                    padding: "0 0 10px 0",
                  }}
                >
                  <CartItemText>{el.item.name}</CartItemText>
                  <CartItemPrice>
                    {(el.item.price * el.quantity).toFixed(2)} €
                  </CartItemPrice>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 220,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <EnDecreaseBtn onClick={() => cart.reduceQuantity(el.item)}>
                      <RemoveOutlinedIcon style={{ fontSize: 28 }} />
                    </EnDecreaseBtn>
                    <Quantity>{el.quantity}</Quantity>
                    <EnDecreaseBtn onClick={() => cart.addItemToCart(el.item)}>
                      <AddOutlinedIcon style={{ fontSize: 28 }} />
                    </EnDecreaseBtn>
                  </div>

                  <RemoveItemButton
                    onClick={() => cart.removeItemFromCart(el.item)}
                  >
                    <DeleteOutlineOutlinedIcon style={{ fontSize: 45 }} />
                  </RemoveItemButton>
                </div>
              </div>
            </CartItem>
          ))
        )}
      </CartItemsWapper>
      <PaymentFooter>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Subtotal>Zwischensumme: </Subtotal>
          <Subtotal>{cart.netTotal.toFixed(2)} €</Subtotal>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Subtotal style={{ color: "#888888" }}>
            {cart.tax * 100}% MwSt.:{" "}
          </Subtotal>
          <Subtotal style={{ color: "#888888" }}>
            {(cart.total - cart.netTotal).toFixed(2)} €
          </Subtotal>
        </div>
        {!!orderDetails.organizationName && (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Discount>{orderDetails.organizationName}</Discount>
              <Discount>
                {orderDetails.billedToOrganization.toFixed(2)} €
              </Discount>
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Total>Gesamt</Total>
          <Total>
            Total: {(cart.total - orderDetails.billedToOrganization).toFixed(2)}{" "}
            €
          </Total>
        </div>
        <BtnCheckout onClick={() => handlePayment()}>Bezahlen</BtnCheckout>
      </PaymentFooter>
    </CartContainer>
  );
};

export default CartPage;
