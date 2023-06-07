import React from "react"
import "./NFTCard.css"

const NFTCard = () => {
    return(
        <a className="no-underline" target="blank" href="https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/63281979494229544123467746873783103813610368747147527633129247368696274354177">
            <div  className="nftcard m-7">
                <div className="nftcard2">
                    <img 
                    src="https://i.seadn.io/gcs/files/f24edf17022dfca66186a1fa0199d500.jpg?auto=format&dpr=1&w=1000"
                    className="mx-auto mb-3 rounded-lg border-4"
                    />
                    <p>Product Name:</p>
                    <p>Product ID:</p>
                    <p>Product Serial No:</p>
                    <p>WarrantyExpiry Date:</p>
                    <p>Purchase Date:</p>

                    <div className="flex justify-end"><div className="blue-button pink-shadow center-text leading-[3px] self-end m-3">Valid</div></div>
                    
                </div>
            </div>
        </a>
        
    )
}

export default NFTCard;