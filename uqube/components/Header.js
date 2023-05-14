import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'

const Header = () =>{
    const router = useRouter();
    return(
        <div align="center" style={{backgroundColor:"#F2F2F2"}}>
            <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
            <Image src="/images/main.jpg" width="800" height="400" style={{width:"800px", height:"400px", objectFit:"cover", backgroundColor:"gray"}}></Image>
                <Link href="/LetterBoard" legacyBehavior>
                    <a className={router.pathname=='/LetterBoard' ? styles.active:''} style={{marginRight:"30px", fontSize:"20px"}}>Letter</a>
                </Link>
                <Link href="/MediaBoard" legacyBehavior>
                    <a className={router.pathname=='/MediaBoard'? styles.active:''} style={{marginRight:"30px", fontSize:"20px"}}>Media</a>
                </Link>
            </div>
        </div>
    )
}

export default Header;