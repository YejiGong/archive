import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'
import { Grid, Input, Loading, useInput } from '@nextui-org/react';
import { SendButton } from './SendButton';
import { SendIcon } from './SendIcon';
import Button from '@nextui-org/react';
import { useState } from 'react';
export default function Header(){
    const router = useRouter();
    const query = router.query;
    const [value,setValue] = useState(''+query.search);
    const [option, setOption] = useState(query.option);
    return(
        <div style={{backgroundColor:"#F2F2F2"}}>
            <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
            <div align="right" className="close" onClick={()=>router.replace("/LetterBoard")}></div>
            <div align="center" style={{paddingBottom:"10px", paddingTop:"10px", display:"flex", justifyContent:"center", width:"800px"}}>
            <select defaultValue={option} name="search_option" onChange={(e)=>setOption(e.target.value)} style={{backgroundColor:'transparent', border:'0px'}}>
                <option key="content" value="content" defaultValue={option === 'content'}>
                    내용
                </option>
                <option key="writer" value="writer" defaultValue={option === 'writer'}>
                    작성자
                </option>
            </select>
            <Input
            clearable
            underlined
            initialValue={value}
            onChange={(e)=>setValue(e.target.value)}
            color="primary"
            type="text"
            />
            <Link href={{pathname:"/search/"+router.pathname.substring(8), query:{search:value, option:option}}} style={{paddingTop:"5px"}}>
            <span class="reading-glasses">
                        <span class="reading-glasses__circle"></span>
                        <span class="reading-glasses__line"></span>
                        </span>
            </Link>
            </div>
            <Link href={{pathname:"/search/Letter", query:{search:value, option:option}}} legacyBehavior>
                    <a className={router.pathname=='/search/Letter'? styles.active:''} style={{marginRight:"30px", fontSize:"20px"}}>Letter</a>
                </Link>
                <Link href={{pathname:"/search/Media", query:{search:value, option:option}}} legacyBehavior>
                    <a className={router.pathname=='/search/Media'? styles.active:''} style={{marginRight:"30px", fontSize:"20px"}}>Media</a>
                </Link>
            </div>
        </div>
    )
}
