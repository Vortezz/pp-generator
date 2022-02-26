import React, {createRef, useRef, useState} from 'react';
import mergeImages, {ImageSource} from "merge-images";
import {saveAs} from 'file-saver';

function App() {
    const body: any [] = [];
    const tshirt: any [] = [];
    const flags: any [] = [];

    const componentRef = useRef<HTMLDivElement>(null);

    const [currentBody, setCurrentBody] = useState(0)
    const [currentTshirt, setCurrentTshirt] = useState(9999)
    const [currentFlags, setCurrentFlags] = useState(9999)

    const [render, setRender] = useState("")

    const bodyFiles = ["normal.png", "ice.png", "fire.png"]
    const tshirtsFiles = ["black_shirt.png", "ekalia_shirt.png", "white_shirt.png", "green_shirt.png", "overalls.png"]
    const flagsFiles = ["lgbt_flags.png", "ukraine_flags.png"]

    function renderPicture() {
        // @ts-ignore
        const images: any[] = [];
        if (currentBody != 9999) {
            images.push({src: body[currentBody]})
        }
        if (currentTshirt != 9999) {
            images.push({src: tshirt[currentTshirt]})
        }
        if (currentFlags != 9999) {
            images.push({src: flags[currentFlags]})
        }
        images.filter((val) => val !== null);
        console.log(images)
        mergeImages(images).then(
            b64 => setRender(b64)
        )
    }

    for (const i in bodyFiles) {
        body.push(require("./pictures/body/" + bodyFiles[i]))
    }

    for (const i in tshirtsFiles) {
        tshirt.push(require("./pictures/tshirts/" + tshirtsFiles[i]))
    }

    for (const i in flagsFiles) {
        flags.push(require("./pictures/flags/" + flagsFiles[i]))
    }

    // @ts-ignore
    return (
        <div className="w-full h-screen bg-gray-800">
            <div className={"flex text-white h-[calc(30rem)] w-full justify-around"}>
                <div id={"picture"}
                     className={"h-[calc(30rem)] w-[calc(30rem)]"}
                     ref={componentRef}>
                    <div>
                        {currentBody == 9999 ? null :
                            <img srcSet={body[currentBody]}
                                 className={"h-[calc(30rem)] w-[calc(30rem)] absolute top-0"}/>}
                        {currentTshirt == 9999 ? null :
                            <img srcSet={tshirt[currentTshirt]}
                                 className={"h-[calc(30rem)] w-[calc(30rem)] absolute top-0"}/>}
                        {currentFlags == 9999 ? null :
                            <img srcSet={flags[currentFlags]}
                                 className={"h-[calc(30rem)] w-[calc(30rem)] absolute top-0"}/>
                        }
                    </div>
                </div>
                <div className={"my-auto text-center"}>
                    Preview<br/>
                    {"<------"}<br/><br/>
                    Render<br/>
                    {"------>"}<br/>
                    <div onClick={() =>
                        // @ts-ignore
                        renderPicture()}>
                        Render picture
                    </div>
                    <div onClick={() => {
                        saveAs(render, "image.png")
                    }}>
                        Download picture
                    </div>
                </div>
                <div>
                    <img src={render} className={"h-[calc(30rem)] left-[calc(30rem)] w-[calc(30rem)]"}/>
                </div>
            </div>
            <div className={"flex flex-col justify-center mx-auto"}>
                <div className={"flex mx-auto"}>
                    {
                        body.map((bodyPicture, key) => {
                            return <img src={bodyPicture} onClick={() => {
                                if (currentBody === key) {
                                    setCurrentBody(9999)
                                } else {
                                    setCurrentBody(key)
                                }
                            }
                            }
                                        className={"m-2 w-20 h-20 " + (currentBody === key ? "border-2 rounded-md border-gray-200" : "")}/>
                        })
                    }
                </div>
                <div className={"flex mx-auto"}>
                    {
                        tshirt.map((tshirtPicture, key) => {
                            return <img src={tshirtPicture} onClick={() => {
                                if (currentTshirt === key) {
                                    setCurrentTshirt(9999)
                                } else {
                                    setCurrentTshirt(key)
                                }
                            }
                            }
                                        className={"m-2 w-20 h-20 " + (currentTshirt === key ? "border-2 rounded-md border-gray-200" : "")}/>
                        })
                    }
                </div>
                <div className={"flex mx-auto"}>
                    {
                        flags.map((flagsPicture, key) => {
                            return <img src={flagsPicture} onClick={() => {
                                if (currentFlags === key) {
                                    setCurrentFlags(9999)
                                } else {
                                    setCurrentFlags(key)
                                }
                            }
                            }
                                        className={"m-2 w-20 h-20 " + (currentFlags === key ? "border-2 rounded-md border-gray-200" : "")}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default App
;
