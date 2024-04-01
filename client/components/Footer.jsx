import { FaPhoneAlt, FaAddressCard  } from "react-icons/fa";
import { TfiFacebook } from "react-icons/tfi";
import { SiZalo, SiTiktok  } from "react-icons/si";
import { AiFillMail } from "react-icons/ai";

const Footer = () => { 
    return(
        <div className="margin-component h-full flex flex-col py-5">
            <div className="flex items-center gap-2">
                <div className="flex flex-col px-5 gap-4 h-full w-1/2">
                    <h2 className="text-2xl underline underline-offset-2 font-bold w-full h-1/2">ABOUT US</h2>
                    <div className="flex flex-col gap-1 justify-center h-1/2">
                        <div className="flex items-center gap-1 font-semibold"><FaPhoneAlt /> Hotline: <a href="tel:+84949859171" className="text-[#ff9b49] hover:underline hover:underline-offset-2">0949859171</a></div> 
                        <div className="flex items-center gap-1 font-semibold"><AiFillMail /> Email: <a href="mailto:tadanglam93@gmail.com" className="text-[#ff9b49] hover:underline hover:underline-offset-2">tadanglam93@gmail.com</a></div>
                        <div className="flex items-center gap-1 font-semibold"><FaAddressCard /> Address: <span href="mailto:tadanglam93@gmail.com" className="text-[#ff9b49] hover:underline hover:underline-offset-2">tadanglam93@gmail.com</span></div>
                    </div>
                </div>
                <div className="flex flex-col px-5 gap-4 h-full w-1/2">
                    <h2 className="text-2xl underline underline-offset-2 font-bold w-full h-1/2">MORE INFORMATION</h2>
                    <div className="flex flex-col gap-1 justify-center h-1/2">
                        <a className="flex items-center gap-1 font-semibold" href="https://www.facebook.com/profile.php?id=100010948332178" target= "_blank"><TfiFacebook /><span className="text-[#ff9b49] hover:underline hover:underline-offset-2">Facebook</span></a> 
                        <a className="flex items-center gap-1 font-semibold" href="https://zalo.me/0949859171" target= "_blank"><SiZalo /><span className="text-[#ff9b49] hover:underline hover:underline-offset-2">Zalo</span></a>
                        <a className="flex items-center gap-1 font-semibold" href="https://www.tiktok.com/@MS4wLjABAAAAuEU-yoWJfjkHoVLsxLtjQ8tugsGe8luBivoIQuDDtWC1zRQUm_yMkLR6vBzbT25C" target= "_blank"><SiTiktok /><span className="text-[#ff9b49] hover:underline hover:underline-offset-2">Tiktok</span> </a>
                    </div>
                </div>
            </div>
            <div>
                aaaaaa
            </div>
        </div>
    )
}

export default Footer;
