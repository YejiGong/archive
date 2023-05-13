import { useEffect, useRef } from "react";
import {useInfiniteQuery} from "react-query";
import axios from "axios"
import useLocalStorage from "use-local-storage"
import LetterBoard from "./LetterBoard";
import Link from "next/link";
import Image from "next/image";

export default function Home(){
  return(
    <>
    <div align="center" style={{backgroundColor:"#F2F2F2"}}>
      <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
      <Image src="/images/main.jpg" width="800" height="400" style={{width:"800px", height:"400px", objectFit:"cover", backgroundColor:"gray"}}></Image>
        <Link href="/LetterBoard">Letter</Link>
      </div>
    </div>
    </>
  )
}