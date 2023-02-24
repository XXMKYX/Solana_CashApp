import Modal from '../Modal'
import { createQR, encodeURL, findReference, validateTransfer, FindReferenceError, ValidateTransferError } from "@solana/pay"
import { PublicKey, Keypair } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useRef, useState } from 'react';
import { truncate } from "../../utils/string";
import QRCodeStyling from '@solana/qr-code-styling';




const TransactionQRModal = ({ modalOpen, setModalOpen, userAddress, setQrCode }) => {
    const qrRef = useRef()
    const {connection} = useConnection()
    // Estado true to rerender QR
    const loadQr = () => {
        setQrCode(true)
    }
    useEffect(() => {
        let wal = 'G8yeWe4Jp3WzsGdnZ58iGvQF2Eb2768dCzSDAWb4ZWBj'
        console.log(wal)
        const recipient = new PublicKey(wal) //PublicKey(userAddress)
       //G8yeWe4Jp3WzsGdnZ58iGvQF2Eb2768dCzSDAWb4ZWBj
        //var message1 = userAddress;
        //var userAddress2 = Base58.encode(new Buffer(message1));
        //console.log(userAddress2)


        const amount = new BigNumber("1") //Estatico, el QR enviara 1 SOL
        const reference = Keypair.generate().publicKey //random keypair
        const label = "Sol payments app"
        const message = "Ty 4 ur payment!"
        //Parametros que generara el QR
        
        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            image:
              "https://seeklogo.com/images/S/solana-sol-logo-12828AD23D-seeklogo.com.png?v=637944448890000000",
            dotsOptions: {
              color: "#4267b2",
              type: "rounded"
            },
            imageOptions: {
              crossOrigin: "anonymous",
              margin: 20
            }
          });
        
        
        
        
        const urlParams = {
            recipient,
            amount,
            reference,
            label,
            message
        }
        const url = encodeURL(urlParams)

        /*const [url, setUrl] = useState(url2);
        const [fileExt, setFileExt] = useState("png");
        const ref = useRef(null);

        useEffect(() => {
            qrCode.append(ref.current);
        }, []);

        useEffect(() => {
            qrCode.update({
            data: url
            });
        }, [url]);*/


        const qr = createQR(url, 369, 'transparent') //Diseño QR
        //Validacion qrRef en HTML
        if(qrRef.current){
            qrRef.current.innerHTML = ''
            qr.append(qrRef.current)
            


        }
        //Waiting transaction
        /*const interval = setInterval(async() => {
            //console.log("Wating transaction...")
            try{
                const signatureInfo = await findReference(connection, reference, )
            }catch(e){
                console.log(e.message)
            }
        })*/
    })

    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div >
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div ref={qrRef}/>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1">
                    <p className="text-lg font-medium text-gray-800">{truncate(userAddress)}</p>

                    <p className="text-sm font-light text-gray-600">Scan to pay ${truncate(userAddress)}</p>

                    <button onClick={() => loadQr()} className="w-full rounded-lg bg-[#16d542] py-3 hover:bg-opacity-70">
                        <span className="font-medium text-white">Load QR code</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default TransactionQRModal
