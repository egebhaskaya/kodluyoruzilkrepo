import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Web3 from "web3";
import contractABI from "./contractABI.json";

function App() {
  const [contract, setContract] = useState(null);
  const [contractBalance, setContractBalance] = useState(null);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [product3, setProduct3] = useState(null);
  const [product4, setProduct4] = useState(null);
  const [error, setError] = useState("");
  const [address, setAddres] = useState(null);
  const contractAddress = "0xD049a50A50cAa17fcA7f2979251E2c8D7a89DFDa";

  //contract instance initiation
  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    setContract(contract);
  }, []);

  //connect to metamask
  const connect = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setError(`Connected account: ${account.toString().slice(0, 10)}...`);
      setAddres(account[0]);
    } else {
      console.log("Please install metamask");
      setError("Please install metamask");
    }
  };

  //contract balance call
  useEffect(() => {
    let timer = setInterval(() => contractBalanceCall(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const contractBalanceCall = async () => {
    const contractBalance = await contract.methods.contractBalance().call();
    setContractBalance(parseInt(contractBalance) / 10 ** 18);
  };

  //contract product1
  useEffect(() => {
    let timer = setInterval(() => contractProduct1Call(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const contractProduct1Call = async () => {
    const contractProduct1 = await contract.methods.Products("0").call();
    setProduct1(contractProduct1);
  };

  //contract product2
  useEffect(() => {
    let timer = setInterval(() => contractProduct2Call(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const contractProduct2Call = async () => {
    const contractProduct2 = await contract.methods.Products("1").call();
    setProduct2(contractProduct2);
  };

  //contract product3
  useEffect(() => {
    let timer = setInterval(() => contractProduct3Call(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const contractProduct3Call = async () => {
    const contractProduct3 = await contract.methods.Products("2").call();
    setProduct3(contractProduct3);
  };

  //contract product4
  useEffect(() => {
    let timer = setInterval(() => contractProduct4Call(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const contractProduct4Call = async () => {
    const contractProduct4 = await contract.methods.Products("3").call();
    setProduct4(contractProduct4);
  };

  //buy product1
  const buy1 = async () => {
    await contract.methods.buyProduct(0).send({
      from: address.toString(),
      value: "10000000000000000",
    });
  };
  //buy product2
  const buy2 = async () => {
    await contract.methods.buyProduct(1).send({
      from: address.toString(),
      value: "5000000000000000",
    });
  };
  //buy product3
  const buy3 = async () => {
    await contract.methods.buyProduct(2).send({
      from: address.toString(),
      value: "30000000000000000",
    });
  };
  //buy product4
  const buy4 = async () => {
    await contract.methods.buyProduct(3).send({
      from: address.toString(),
      value: "100000000000000000",
    });
  };
  return (
    <>
      <Navbar>
        <Title>BLOCKCHAIN SECOND HAND MARKET</Title>
        <ItemName>{error}</ItemName>
        <NavBarButton onClick={connect}>
          {address === null ? "Connect" : "Connected"}
        </NavBarButton>
      </Navbar>
      <ItemsContainer>
        <ItemName>Please switch to Ethereum - Ropsten Testnet!</ItemName>
        <ItemBox>
          <ItemPictureContainer>
            <ItemPicture src="https://www.webdedestek.com/wp-content/uploads/2021/05/Razer-Book-13.jpg" />
          </ItemPictureContainer>
          <ItemInfoContainer>
            <ItemName>{`Item name: ${
              product1 === null ? null : product1.productName
            }`}</ItemName>
            <ItemPrice>{`Item price: ${
              product1 === null ? null : product1.price / 10 ** 18
            } ETHRopsten`}</ItemPrice>
            <ItemPrice>
              {`Is item sold: ${product1 === null ? null : product1.isSold}`}
            </ItemPrice>
            <ItemPrice>{`Owner: ${
              product1 === null ? null : product1.owner.slice(0, 20)
            }`}</ItemPrice>
            <ItemPrice>{`Shipping Status: ${
              product1 === null ? null : product1.shippingStatus
            }`}</ItemPrice>

            <BuyButton onClick={buy1}>Buy This Item!</BuyButton>
            <ErrorMessage>
              {address === null ? "Please connect your wallet!" : ""}
            </ErrorMessage>
          </ItemInfoContainer>
        </ItemBox>
        <ItemBox>
          <ItemPictureContainer>
            <ItemPicture src="https://techcrunch.com/wp-content/uploads/2021/02/keyboard.jpg?w=1390&crop=1" />
          </ItemPictureContainer>
          <ItemInfoContainer>
            <ItemName>{`Item name: ${
              product2 === null ? null : product2.productName
            }`}</ItemName>
            <ItemPrice>{`Item price: ${
              product2 === null ? null : product2.price / 10 ** 18
            } ETHRopsten`}</ItemPrice>
            <ItemPrice>
              {`Is item sold: ${product2 === null ? null : product2.isSold}`}
            </ItemPrice>
            <ItemPrice>{`Owner: ${
              product2 === null ? null : product2.owner.slice(0, 20)
            }...`}</ItemPrice>
            <ItemPrice>{`Shipping Status: ${
              product2 === null ? null : product2.shippingStatus
            }`}</ItemPrice>

            <BuyButton onClick={buy2} disabled>
              Item Sold!
            </BuyButton>
            <ErrorMessage>
              {address === null ? "Please connect your wallet!" : ""}
            </ErrorMessage>
          </ItemInfoContainer>
        </ItemBox>
        <ItemBox>
          <ItemPictureContainer>
            <ItemPicture src="https://i.insider.com/5cd9e528e9f08a2c581229ac?width=700&format=jpeg&auto=webp" />
          </ItemPictureContainer>
          <ItemInfoContainer>
            <ItemName>{`Item name: ${
              product3 === null ? null : product3.productName
            }`}</ItemName>
            <ItemPrice>{`Item price: ${
              product3 === null ? null : product3.price / 10 ** 18
            } ETHRopsten`}</ItemPrice>
            <ItemPrice>
              {`Is item sold: ${product3 === null ? null : product3.isSold}`}
            </ItemPrice>
            <ItemPrice>{`Owner: ${
              product3 === null ? null : product3.owner.slice(0, 20)
            }...`}</ItemPrice>
            <ItemPrice>{`Shipping Status: ${
              product3 === null ? null : product3.shippingStatus
            }`}</ItemPrice>
            <BuyButton onClick={buy3}>Buy This Item!</BuyButton>
            <ErrorMessage>
              {address === null ? "Please connect your wallet!" : ""}
            </ErrorMessage>
          </ItemInfoContainer>
        </ItemBox>
        <ItemBox>
          <ItemPictureContainer>
            <ItemPicture src="https://5.imimg.com/data5/HG/AY/MY-9149013/hyundai-eon-second-hand-car-500x500.jpg" />
          </ItemPictureContainer>
          <ItemInfoContainer>
            <ItemName>{`Item name: ${
              product4 === null ? null : product4.productName
            }`}</ItemName>
            <ItemPrice>{`Item price: ${
              product4 === null ? null : product4.price / 10 ** 18
            } ETHRopsten`}</ItemPrice>
            <ItemPrice>
              {`Is item sold: ${product4 === null ? null : product4.isSold}`}
            </ItemPrice>
            <ItemPrice>{`Owner: ${
              product4 === null ? null : product4.owner.slice(0, 20)
            }...`}</ItemPrice>
            <ItemPrice>{`Shipping Status: ${
              product4 === null ? null : product4.shippingStatus
            }`}</ItemPrice>
            <BuyButton onClick={buy4}>Buy This Item!</BuyButton>
            <ErrorMessage>
              {address === null ? "Please connect your wallet!" : ""}
            </ErrorMessage>
          </ItemInfoContainer>
        </ItemBox>
      </ItemsContainer>
      <Footer>
        <ContractBalance>{`Contract Balance: ${contractBalance} ETHRopsten`}</ContractBalance>
        <a
          href="https://ropsten.etherscan.io/address/0xd049a50a50caa17fca7f2979251e2c8d7a89dfda"
          target="_blank"
          rel="noreferrer"
        >
          <ContractButton>Contract Address</ContractButton>
        </a>
      </Footer>
    </>
  );
}
const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: black;
`;

const NavBarButton = styled.button`
  height: 40px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: gray;
  }
`;

const ContractBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 30px;
  color: white;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  flex-direction: column;
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 20px;
  height: 300px;
  width: 900px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ItemPictureContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  width: 100%;
`;

const ItemPicture = styled.img`
  width: 250px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;

const ItemPrice = styled.h3`
  font-size: 17px;
  color: white;
  margin: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ItemName = styled.h2`
  font-size: 25px;
  color: white;
  margin: 0px;
`;

const BuyButton = styled.button`
  background-color: white;
  cursor: pointer;
  height: 40px;
  border-radius: 10px;
  :hover {
    background-color: gray;
  }
  :disabled {
    background-color: gray;
    color: black;
    cursor: default;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: black;
`;

const ContractButton = styled.button`
  background-color: white;
  cursor: pointer;
  height: 40px;
  border-radius: 10px;
  :hover {
    background-color: gray;
  }
`;

const ErrorMessage = styled.h3`
  color: red;
`;

export default App;
