import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2";

import { createOrder } from "@/app/api/route";
const style = {"layout":"vertical"};

const ButtonWrapper = ({ currency, showSpinner, amount, payload, accessToken }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: 'resetOption',
            value: {
                ...options, currency: currency
            }
        });
    }, [currency, showSpinner]);

    const handleSaveOrder = async() => {
        try {
            await createOrder(payload, accessToken);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f1f5f9',
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Payment is Success"
              });
            router.push('/information/order');
        } catch (error) {
            console.log(error)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: `${error.response.data.error}`
              });
        }
    }

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        { amount: { currency_code: currency, value: amount }}
                    ]
                }).then(orderId => orderId)}
                onApprove={(data, actions) => actions.order.capture().then(async (response) => {
                    if(response.status === 'COMPLETED'){
                        await handleSaveOrder(payload);
                        // console.log(payload);
                    }
                })}
            />
        </>
    );
}

export default function Paypal({amount, payload, accessToken}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "AdlO-EVlHgR7cPhU2eu85fYNoq2DdyOuMvrmvz8ICVRKM68rxBZ33IH0V47r-rQ6fdNKu78gf2KBFpEb", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount} payload={payload} accessToken={accessToken} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}
