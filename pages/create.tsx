import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "../utils/helper";
import useNFT from "../web3/hooks/useNft";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSigner } from "wagmi";
import { useRouter } from "next/router";
import useMarket from "../web3/hooks/useMarketPlace";
import { nft } from "../web3/constants/constant";
import { ethers } from "ethers";

function create() {
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const description = useRef() as MutableRefObject<HTMLInputElement>;
  const price = useRef() as MutableRefObject<HTMLInputElement>;

  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState("");
  const { contract } = useNFT();
  const { market } = useMarket();
  const { isConnected } = useAccount();

  console.log(market);
  const router = useRouter();

  useEffect(() => {
    if (!file) {
      setPreview("");
    }

    if (file) {
      const objectUrl = window.URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  }, [file]);

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handlecreateToken = async (e: any) => {
    e.preventDefault();
    if (!name || !file || !description || !price)
      return toast.error("input field is missing");
    if (!isConnected) return toast.error("Connect your wallet!");
    const nameInput = name.current.value;
    const descriptionInput = description.current.value;
    const priceInput = price.current.value;
    const metadata = await uploadFile(
      nameInput,
      descriptionInput,
      priceInput,
      file as any
    );
    const tokenURI = metadata?.url as string;
    setLoading(true);
    try {
      const request = await contract.createToken(tokenURI);
      if (!request.hash) return toast.error(request.message);
      const response = await request.wait();
      const tokenId = await response.events[0]?.args[2].toString();
      let listingPrice = await market.listingPrice();
      listingPrice = listingPrice.toString()
      const price = ethers.utils.parseUnits(priceInput, 'ether')
      const res= await market.ListItemForSale(nft,tokenId,price,{value:listingPrice})
      if(!res.hash) return toast.error(res.message)
      const success = await res.wait()
      if(success){
        toast.success("token created and listed successfully!")
        router.push("/")
      }else{
        toast.error("an error occured")
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  // const

  return (
    <section className="p-2 md:w-1/2 md:mx-auto lg:w-1/2 lg:mx-auto my-8">
      <ToastContainer />
      <form>
        <div className="mb-4">
          <label
            className="text-sm font-semibold block mb-2 capitalize text-gray-500"
            htmlFor="name"
          >
            name
          </label>
          <input
            className="outline-none p-2 rounded-sm border-none w-full bg-gray-300"
            type="text"
            id="name"
            ref={name}
          />
        </div>

        <div className="mb-4">
          <label
            className="text-sm font-semibold block mb-2 capitalize text-gray-500"
            htmlFor="description"
          >
            description
          </label>
          <input
            className="outline-none p-2 rounded-sm border-none w-full bg-gray-300 "
            type="text"
            id="description"
            ref={description}
          />
        </div>

        <div className="mb-4">
          <label
            className="text-sm font-semibold block mb-2 capitalize text-gray-500"
            htmlFor="price"
          >
            price
          </label>
          <input
            className="outline-none p-2 rounded-sm border-none w-full bg-gray-300 "
            type="text"
            id="price"
            ref={price}
          />
        </div>

        <div className="mb-4">
          <label
            className="text-sm font-semibold block mb-2 capitalize text-gray-500"
            htmlFor="file"
          >
            upload nft
          </label>
          <input type="file" id="file" onChange={onFileChange} />
        </div>
        {file ? (
          <div>
            <img className="w-96 mb-4" src={preview} alt="preview" />
          </div>
        ) : null}

        <button
          onClick={handlecreateToken}
          className={`${
            !loading ? "bg-purple-700" : "bg-purple-400"
          } w-full p-2 rounded-sm text-white font-semibold capitalize`}
        >
          {!loading ? <p>create digital assets</p> : <p>Creating token</p>}
        </button>
      </form>
    </section>
  );
}

export default create;
