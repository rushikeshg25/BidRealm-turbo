"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ImageUpload() {
  const [imgUrl, setImgUrl] = useState<string>("");
  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);
  return (
    <div className='w-fit'>
      {imgUrl.length > 0 ? (
        <Image alt='Uploaded image' src={imgUrl} width={300} height={300} />
      ) : (
        <UploadDropzone<OurFileRouter, "imageUploader">
          //   appearance={}
          endpoint='imageUploader'
          onClientUploadComplete={(res) => {
            setImgUrl(res[0]?.url as string);
          }}
          onUploadError={(error: Error) => {
            toast.error("Error uploading image! Try again.");
          }}
        />
      )}
      {/* {imgUrl.length > 0 && (
        <Image alt='Uploaded image' src={imgUrl} width={150} height={150} />
      )} */}
      {/* )} */}
    </div>
  );
}
