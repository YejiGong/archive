import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'
import { Grid, Input, Loading, useInput } from '@nextui-org/react';
import { SendButton } from './SendButton';
import { SendIcon } from './SendIcon';
import Button from '@nextui-org/react';
import { useState } from 'react';
export default function Header(){
    const router = useRouter();
    const [value,setValue] = useState('');
    const [option, setOption] = useState('content');
    return(
        <div style={{backgroundColor:"#F2F2F2"}}>
            <div style={{paddingBottom:"5px", display:"flex", justifyContent:"flex-end", width:"800px"}}>
            <select name="search_option" onChange={(e)=>setOption(e.target.value)} style={{backgroundColor:'transparent', border:'0px'}}>
                <option key="content" value="content" defaultValue="true">
                    내용
                </option>
                <option key="writer" value="writer">
                    작성자
                </option>
            </select>
            <Input
            id="search"
            clearable
            underlined
            onChange={(e)=>setValue(e.target.value)}
            color="primary"
            type="text" />
            
            <Link href={{pathname:"/search/Letter", query:{search:value, option:option}}} style={{paddingTop:"5px"}}>
                        <span class="reading-glasses">
                        <span class="reading-glasses__circle"></span>
                        <span class="reading-glasses__line"></span>
                        </span>
            </Link>
            </div>
            <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
            <Image src="/images/main.jpg" width="800" height="400" style={{width:"800px", height:"400px", objectFit:"cover", backgroundColor:"gray"}}></Image>
                <Link href="/LetterBoard" legacyBehavior>
                    <a className={router.pathname=='/LetterBoard'? styles.active:''} style={{marginRight:"30px", fontSize:"20px"}}>Letter</a>
                </Link>
                <Link href="/MediaBoard" legacyBehavior>
                    <a className={router.pathname=='/MediaBoard'? styles.active:''} style={{marginRight:"30px", fontSize:"20px"}}>Media</a>
                </Link>
            </div>
        </div>
    )
}
