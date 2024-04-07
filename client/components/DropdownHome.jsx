import Link from 'next/link'

const DropdownHome = () => {
    return ( 
        <div className="flex justify-center gap-2 border-b rounded-lg bg-white px-3 py-2 w-full">
                <Link href='/category/65f04a1c81da17e4da645807' className=''><img className='rounded-lg' src="/BannerBurger.png" alt="picture" /></Link>
                <Link href='/category/65f04dde81da17e4da64580f' className=''><img className='rounded-lg' src="/BannerPizza.png" alt="picture" /></Link>
                <Link href='/category/65f04de481da17e4da645811' className=''><img className='rounded-lg' src="/BannerDrinks.png" alt="picture" /></Link>
                <Link href='/category/65f04de981da17e4da645813' className=''><img className='rounded-lg' src="/bannerPasta.png" alt="picture" /></Link>
                <Link href='/category/65f04ded81da17e4da645815' className=''><img className='rounded-lg' src="/BannerSoup.png" alt="picture" /></Link>
                <Link href='/category/65f04df081da17e4da645817' className=''><img className='rounded-lg' src="/BannerSalad.png" alt="picture" /></Link>
        
        </div>
    );
}
 
export default DropdownHome;