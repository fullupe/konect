import React, { useEffect, useState } from 'react'
import {AiOutlineCloudUpload } from 'react-icons/ai'
import {MdDelete} from "react-icons/md";

import toast, { Toaster } from 'react-hot-toast'



import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'

import axios from 'axios';

const URLPOST = process.env.NEXT_PUBLIC_URL_POST;

function ClientRequestForm() {

  //const[loading, SetLoading] = useState(false)

 

  const [preview, setPreview] = useState(null)



  const router = useRouter()

    const [imageAsset, setImageAsset] = useState(null);
    const [imageAssetSign, setImageAssetSign] = useState(null);
    const [wrongImageType, setWrongImageType] = useState(false)
    const [loading, setLoading] = useState(false);
    const [loadingSign, setLoadingSign] = useState(false);

    const [referenceNumber, setreferenceNumber] = useState(null)
    const [pinNumber, setPinNumber] = useState(null)



    const { register, setError, formState: { errors }, reset, getValues, handleSubmit } = useForm();

    const onSubmit=({sureName,firstName,otherName,dateofBirth,region, center,issueDate,group,pin2,getAutoNum_ref})=>{
      
      // EXPIRATION AND UPDATE1 UPDATE2 UPDATE
      let issueanDate = new Date(issueDate);
      const theday =issueanDate.getDate()
      const themonth= issueanDate.getMonth()
      const theyear = issueanDate.getFullYear()

      let expiryDate = `${theday}/${themonth}/${theyear+6}`
      let firstUpdate= `${theday}/${themonth}/${theyear+2}`
      let secondUpdate = `${theday}/${themonth}/${theyear+4}`

      
      //  pin out of dateofbirth
      let dateofbirthStringAll= dateofBirth.split("-").reverse().join("").slice()
      let shotSurname= sureName.split("").join("").slice(0,3)
      let originalPin = `${shotSurname}-${dateofbirthStringAll}-${pin2 || referenceNumber}`
      
      // ref num out of date of issue
     //let dateofbirthString= dateofBirth.split("/").reverse().join("").slice(0,2)
     let dateofissueString = issueDate.split("-").reverse().join("").slice(0,2)
     let originalRef = `${dateofissueString}-${getAutoNum_ref || pinNumber}-${center}`

      const userData = {
        sureName,
        firstName,
        otherName,
        dateofBirth,
        region, 
        center,
        issueDate,
        group,
        pin:originalPin,
        reference:originalRef,
        firstUpdate,
        secondUpdate,
        expiryDate,
        image:imageAsset.url,
        imagesign:imageAssetSign.url,
        status:"1"
      }
      
      setPreview(userData)
     

  }

  // my own API

// https://script.google.com/macros/s/AKfycbx-xRhMgxzBSSioNcHDeu7mOVBKzqmnLUJ6ux1VnyybFdQ6aZDuGpg1k79h1f-nSB-1/exec?action=adddata



  // submit function
  const finalSubmit =()=>{

    //  axios.post("https://sheet.best/api/sheets/1eba066f-10cb-4661-8841-62647fe3a1f4",preview).then((res)=>{
    //     console.log(res.data)
    //     router.push('/success')
    //   }).catch((error)=>{
    //     console.log(error)
    //   })

    // e.preventDefault()

    const request = preview;

    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open('POST', URLPOST, true) // false for synchronous request

    if(xmlHttp.readyState==1){
      setLoading(true)
    }else {
      setLoading(false)
    }

    xmlHttp.send(JSON.stringify(request)) // Make sure to stringify

    xmlHttp.onload = function () {
      setLoading(false)
      // Do whatever with response
      //console.log(request)
      //alert(xmlHttp.responseText)
      toast('Records Updated!', {
        icon: '🚀',
      })
      console.log(xmlHttp.responseText)
      setImageAsset(null)
      setImageAssetSign(null)
      reset();
      //setInput('')
      //setReflesh(!reflesh)

      setPreview(null)
    }
    xmlHttp.onerror = function () {
      alert(xmlHttp.responseText)
      //console.log(request)
    }

      
  }


  const uploadImage = (e) => {

    const {type, name} =e.target.files[0];

    const myfiles = e.target.files[0]
   

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type==='image/gif' || type === 'image/tiff'){
      setWrongImageType(false);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", myfiles);
      formData.append("upload_preset", "vy3cy6gu");

      axios.post("https://api.cloudinary.com/v1_1/fullupe/image/upload",formData).then((response)=>{
        setImageAsset(response.data)
        console.log(response.data)
        setLoading(false)
      }).catch((error)=>{
        console.log(error)
      })

     

  }else{
      setWrongImageType(true);
  }

  }
  const uploadImageSign = (e) => {

    const {type, name} =e.target.files[0];

    const myfilesSign = e.target.files[0]
   

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type==='image/gif' || type === 'image/tiff'){
      setWrongImageType(false);
      setLoadingSign(true);

      const formData = new FormData();
      formData.append("file", myfilesSign);
      formData.append("upload_preset", "vy3cy6gu");

      axios.post("https://api.cloudinary.com/v1_1/fullupe/image/upload",formData).then((response)=>{
        setImageAssetSign(response.data)
        console.log(response.data)
        setLoadingSign(false)
      }).catch((error)=>{
        console.log(error)
      })

     

  }else{
      setWrongImageType(true);
  }

  }

  //  Auto Generate 5 Digit
  useEffect(() => {
  const min = 100000;
  const max = 999999;
  const refnum = Math.floor(Math.random() * (max - min + 1)) + min;
  setreferenceNumber(refnum);
  }, [])

 //  Auto Generate 6 Digit
  useEffect(() => {
  const min = 10000;
  const max = 99999;
  const pinnum = Math.floor(Math.random() * (max - min + 1)) + min;
  setPinNumber(pinnum)
  }, [])


  return (
    <div className="mt-10 sm:mt-0 text-white flex space-x-12q mx-2 ms:flex-col h-[100%] flex-col-reverse space-y-4 ">
        <Toaster />

  <>
  { preview && 

    <div className ="hiddend  md:flex md:flex-col items-center justify-center mx-2 flex flex-col">

      <div className=" hiddend md:flex w-96 bg-red-000 justify-center border-2">
        {/* <p>preview mode</p> */}

        <div className="flex flex-col  w-87 h-55 bg-gray-500 rounded-sm m-2 overflow-hidden">

        <div className="w-full h-12 bg-red-100"></div>

         <div className="flex w-full h-full">
      
        <div className="flex flex-col  w-26mm mx-0 bg-yellow-000 space-y-1 items-center">
        
        <div className="w-image-w flex items-center justify-center h-image-h mt-8 bg-blue-900 text-xs">
            
            <img className="w-full h-full object-cover rounded-sm" src={imageAsset?.url}/>
        </div>
        <div className="w-18mm items-center justify-center flex mx-1 h-5mm bg-blue-900 text-xs">
        <img className="w-full h-full object-cover rounded-sm" src={imageAssetSign?.url}/>
            {/* sign */}
        </div>

        </div>

        {/*  */}
        <div className="flex flex-col ">
            <div className="flex items-center justify-center space-x-1  mr-2">

            <p className="flex-shrink text-center text-sm uppercase">{preview?.sureName}</p>
            <p className="flex-shrink text-center text-sm uppercase">{preview?.firstName}</p>
            <p className="flex-shrink text-center text-sm uppercase">{preview?.otherName}</p>
            </div>
            
        <div className="flex">
        <div className="w-25mm relative flex flex-col bg-red-000 ">

        <div className="space-y-2 flex flex-col ml-4 mt-8">
            

            <div className="">
            <h4 className="text-1xs text-yellow-300">Date of Birth</h4>
            <p className="text-1xs">{preview?.dateofBirth}</p>
            </div>
            
            <div>
            <h4 className="text-1xs text-yellow-300">Group</h4>
            <p className="text-8.5">{preview?.group}</p>
            </div>

            <div>
            <h4 className="flex-shrink text-1xs text-yellow-300">Date of issue</h4>
            <p className="text-1xs">{preview?.issueDate}</p>
            </div>

            <div>
            <h4 className="text-1xs text-yellow-300">Expiry Date</h4>
            <p className="text-1xs">{preview?.expiryDate}</p>
            </div>
        </div>
            
        </div>
        <div className="flex  w-36mm bg-green-000 relative">
            
            <div className=" flex w-s-image-w h-s-image-h mt-8 bg-blue-900 top-7 absolute text-xs items-center justify-center">
            <img className="w-full h-full object-cover rounded-sm" src={imageAsset?.url}/>
            </div>
        
            <div className="justify-center ml-6 w-full flex">
            

            <div className="space-y-2 justify-center items-center flex flex-col mt-19">
            <div className="flex">
            <p className="text-1xs uppercase ml-4">{preview?.pin}</p>
            </div>

            <div className="flex flex-col space-y-2 mt-12">

            <div>
            <h4 className="text-1xs text-yellow-300">Region</h4>
            <p className="text-1xs">{preview?.region}</p>
            </div>

            <div>
            <h4 className="text-1xs text-yellow-300">issue center</h4>
            <p className="text-1xs">{preview?.reference}</p>
            </div>
            </div>

            </div>

            </div>            
      
        </div>

        </div>

        </div>

   </div>



    </div>

          {/* submit */}

      
      </div>

      <div className="px-4 py-3 bg-gray-00 border-b bg-transparent text-center sm:px-6">
                <button
                
                onClick={finalSubmit}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 cursor-pointer border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Final Submit!
                </button>
              </div>

      </div>
      }
      </>




      
      <div className="md:grid md:grid-cols-1 md:gap-6">
       
        <div className="mt-5 md:mt-0 md:col-span-2 items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md ">

              <div className="flex items-center justify-center mb-2 ">
              <p className="text-white italic text-2xl text-center ">Please Fill The forms with the Right Details and Submit..!</p>
              </div>

              <div className="px-4 py-5 bg-gray-900 bg-transparent border-2 sm:p-6 md:max-w-4xl">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-2">
                    <label
                      
                      className="block text-sm font-medium text-gray-00"
                    >
                      Sure Name
                    </label>
                    <input
                    //value={s_name}
   
                      type="text"
                        {...register("sureName",{
                            //required:true
                            required:"Field is required!"
                        })}

                     
                      className="mt-1 p-1 focus:ring-indigo-500 border-2 border-red-300 uppercase bg-transparent   focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-lg  rounded-md"
                    />
                    { errors.sureName && <p className="text-red-500 mt-1">{errors?.sureName.message}</p> }
                    
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label
                    
                      className="block text-sm font-medium text-gray-00"
                    >
                      First Name
                    </label>
                    <input
                    //value={f_name}
                      type="text"
                      {...register("firstName",{
                        required:"Field is required!"
                    })}

                    
                      className="mt-1 p-1 focus:ring-indigo-500 border-2 border-red-300 uppercase bg-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white  focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-lg  rounded-md"
                    />
                    { errors.firstName && <p className="text-red-500 mt-1">{errors?.firstName.message}</p> }
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label
                    
                      className="block text-sm font-medium"
                    >
                      Other Name
                    </label>
                    <input
                    //value={o_name}
                      type="text"
                      {...register("otherName",{
                        //required:fales
                    })}

                  
                      className="mt-1 p-1 focus:ring-indigo-500 border-2 border-red-300 uppercase bg-transparent focus:border-indigo-500 block w-full h-8 shadow-sm sm:text-lg rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                     
                      className="block text-sm font-medium text-gray-000"
                    >
                      Date of Birth

                    </label>
                    <div className="relative">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                       
                      </div>
                      <input

                        {...register("dateofBirth",{
                          required:"Select Date of Birth"
                        })}
                        
                        type="date"
                        className=" text-white   border-2 border-red-300 uppercase bg-transparent  sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"

                        />
                        { errors.dateofBirth && <p className="text-red-500 mt-1">{errors?.dateofBirth.message}</p> }
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2 justify-center flex flex-col  items-center">
                    <label
                     
                      className="block text-sm font-medium text-gray-00"
                    >
                      Pin (Optional)
                    </label>
                    <input
                    maxLength="5"
                    placeholder={pinNumber}
                      type="text"
                      {...register("pin2",{
                        required:false
                    })}
                      
                      className="mt-1 text-center border-2 border-red-300 uppercase bg-transparent p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md rounded-md"
                    />
                  </div>

              

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block text-sm font-medium text-gray-00"
                    >
                      Nationality
                    </label>
                    <select
                   
                      type="text"
                    {...register("region",{
                            required:true
                        })}
                     
                      className="mt-1 block w-full py-2 px-3 border-2 border-red-300 uppercase bg-transparent   bg-whites rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    >
                      <optgroup label="Choose Region">
                    
                      <option>Ghanaian</option>
                      <option>None Ghanaian</option>
                      {/* <option>Volta</option> */}
                      </optgroup >
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                     
                      className="block text-sm font-medium text-gray-00"
                    >
                      Center
                    </label>
                    <select
                    {...register("center",{
                      required:true
                  })}
                     
                      className="mt-1 block w-full py-2 px-3 border-2 border-red-300 uppercase bg-transparent bg-whites rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    >
                       <optgroup label="Choose Center">
                      <option>G1</option>
                      <option>G2</option>
                      <option>G3</option>
                      <option>W1</option>
                      <option>W2</option>
                      <option>A1</option>
                      <option>A2</option>
                      <option>A3</option>
                      <option>A4</option>
                      <option>E1</option>
                      <option>E2</option>
                      <option>E3</option>
                      <option>B3</option>
                      <option>B1</option>
                      <option>B2</option>
                      <option>B3</option>
                      <option>N1</option>
                      <option>N2</option>
                      <option>H1</option>
                      <option>H2</option>
                      <option>H3</option>
                      <option>C1</option>
                      <option>C2</option>
                      <option>C3</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                   
                      className="block text-sm font-medium text-gray-00"
                    >
                      Date of Issue
                    </label>
                    <div className="relative">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                       
                      </div>
                      <input
                    
                        type="date"
                        {...register("issueDate",{
                          required:"Select Date"
                      })}
                        className=" text-whites   border-2 border-red-300 uppercase bg-transparent  sm:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                      { errors.issueDate && <p className="text-red-500 mt-1">{errors?.issueDate.message}</p> }
                    </div>
                  </div>
                 
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2 justify-center flex flex-col  items-center">
                    <label
                     
                      className="block text-sm font-medium text-gray-00"
                    >
                      Reference Num. (Optional)
                    </label>
                    <input
                    maxLength="6"
                    placeholder={referenceNumber}
                      type="text"
                      {...register("getAutoNum_ref",{
                        required:false
                    })}
                      
                      className="mt-1 text-center border-2 border-red-300 uppercase bg-transparent p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md rounded-md"
                    />
                  </div>

               

                 

                  <div className="col-span-6 sm:col-span-3">
                    <label
                     
                      className="block text-sm font-medium text-gray-00"
                    >
                      Group
                    </label>
                    <select

                      {...register("group",{
                        required:true
                      })}
                     
                      className="mt-1 block w-full py-2 px-3 border-2 border-red-300 uppercase bg-transparent  bg-whites rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    >
                      <optgroup label="Choose Group">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                      <option>F</option>
                      <option>AB</option>
                      <option>AC</option>
                      <option>AD</option>
                      <option>AE</option>
                      <option>AF</option>
                      <option>ABE</option>
                      <option>ADE</option>
                      <option>AEF</option>
                      <option>BE</option>
                      <option>DE</option>
                      <option>EF</option>
                      </optgroup>
                    </select>
                  </div>



                  <div className="col-span-6 sm:col-span-3  items-center">
                    
                    <div className="md:flex space-x-2  items-center justify-center bg-red-000">

                  <div className="bg-secondaryColor p-3 flex flex-col items-center justify-center w-full">
                    <p className="block text-sm font-medium text-gray-00">Photo</p>
                    <div className="flex justify-center items-center  border-2 border-dotted border-gray-300 p-3 w-full h-420 ">
                     
                        
                        {wrongImageType && <p>Wrong Image Type</p>}
                        {!imageAsset  ? (
                            <label className="flex">
                                <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-bold text-2xl">

                                    {loading ? ( <p className="flex text-center animate-pulse text-green-900">Loading...</p>):(
                                      
                                      <div className="flex flex-col items-center cursor-pointer">

                                        <AiOutlineCloudUpload />
                                        <p className="text-sm">Click to Upload</p>
                                      </div>

                                    )}

                                    </p>

                                </div>
                                
                                </div>
                                <input type="file"
                               
                                className="w-0 h-0"
                                onChange={uploadImage}
                                />
                                
                            </label>
                              ):(
                            <div className="relative h-full">

                                <img src={imageAsset?.url} alt="uploaded-image" className="h-24 w-24"/>

                                <button 
                                type="button" 
                                className="absolute bottom-1 right-1 p-3 rounded-full bg-white text-sm cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                onClick={()=>setImageAsset(null)}
                                >
                                
                                    <MdDelete className="text-red-600"/>

                                </button>

                            </div>
                        )}
                    </div>
                </div>

              
                <div className="bg-secondaryColor p-3 flex flex-col items-center justify-center w-full">
                    <p className="block text-sm font-medium text-gray-00">Signed Photo</p>
                    <div className="flex justify-center items-center  border-2 border-dotted border-gray-300 p-3 w-full h-420 ">
                     
                        
                        {wrongImageType && <p>Wrong Image Type</p>}
                        {!imageAssetSign  ? (
                            <label className="flex justify-center items-center">
                                <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="font-bold text-2xl">

                                    {loadingSign ? ( <p className="flex text-center animate-pulse text-green-900">Loading...</p>):(
                                      
                                      <div className="flex flex-col items-center cursor-pointer">

                                        <AiOutlineCloudUpload />
                                        <p className="text-sm text-center">Click to Upload</p>
                                      </div>

                                    )}

                                    </p>

                                </div>
                                
                                </div>
                                <input type="file"
   
                                className="w-0 h-0"
                                onChange={uploadImageSign}
                                />
                                
                            </label>
                        ):(
                            <div className="relative h-full">

                                <img src={imageAssetSign?.url} alt="uploaded-image" className="h-24 w-24"/>

                                <button 
                                type="button" 
                                className="absolute bottom-1 right-1 p-3 rounded-full bg-white text-sm cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                onClick={()=>setImageAssetSign(null)}
                                >
                                
                                    <MdDelete className="text-red-600"/>

                                </button>

                            </div>
                        )}
                    </div>
                    </div>
                </div>

                </div>

                  








                
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-00 border-b bg-transparent text-center sm:px-6">
                <button
                disabled={loading || !imageAsset}
                  type="submit"
                  className="inline-flex justify-center py-2 cursor-pointer px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Preview
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClientRequestForm
