import { ethers,BigNumber } from "ethers";
import {NFTStorage} from "nft.storage";

interface createToken {
    name:string,
    description:string,
    price:number,
    image: string
}

export const shortenAddress = (address:string) =>{
    if(!address) return null
    return `${address.substring(0,6)}...${address.substring(address.length -4, address.length)}`

}


export const makeNum = (value:string) =>{
    return value?.substring(0,value.indexOf('.') + 3)
}

const client = new NFTStorage({token: process.env.NEXT_PUBLIC_STORAGE_KEY!})

export const uploadFile = async(name:string, description:string,price:string, image:File) =>{
    try {
        const metadata = await client.store({
            name:name,
            description:description,
            price:price,
            image: new File([image],`${name}.jpg`,{type:'image/jpg'})
        })
        return metadata
    } catch (error) {
        console.error(error)
    }

}