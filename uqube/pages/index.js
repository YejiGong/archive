import { useEffect, useRef } from "react";
import {useInfiniteQuery} from "react-query";
import axios from "axios"
import useLocalStorage from "use-local-storage"
import LetterBoard from "./LetterBoard";
import Link from "next/link";

export default function Home(){
  return(
    <>
    <div align="center" style={{backgroundColor:"#F2F2F2"}}>
      <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
      <img src="/images/main.jpg" style={{width:"800px", height:"400px", objectFit:"cover", backgroundColor:"gray"}}></img>
        <Link href="/LetterBoard">Letter</Link>
      </div>
    </div>
    </>
  )
}