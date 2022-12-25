import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
require("dotenv").config();



const Buy = ({ state}) => {
  notify()

  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
   
    console.log("Transaction is done");
  };

  async function notify() {
    const PK = process.env.PRIVATE_KEY; 
    const Pkey = `0x09a085bd6d8abe8aa6a26fc01828a3d75f2cb8a260655b4580b08339e96cbddb`;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const address = await signer.getAddress();
    console.log("address:- ",address)

    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `[SDK-TEST] notification TITLE:`,
          body: `[sdk-test] notification BODY`
        },
        payload: {
          title: `[sdk-test] payload title`,
          body: `sample msg body`,
          cta: '',
          img: ''
        },
        recipients: `eip155:5:${address}`, 
        channel: 'eip155:5:0x7A2C1B1845a2DCca67DE860531bbDA2Bd4E155B4',
        env: 'staging'
      });
      
      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
  }
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          <button 
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};
export default Buy;
