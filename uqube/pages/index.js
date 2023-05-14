import { useEffect, useRef } from "react";
import {useInfiniteQuery} from "react-query";
import axios from "axios"
import useLocalStorage from "use-local-storage"
import LetterBoard from "./LetterBoard";
import MediaBoard from "./MediaBoard";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";


const Home=()=>{
  return(
    <>
    <Header></Header>
    </>
  )
}

export default Home;