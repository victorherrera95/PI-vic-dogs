import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import { chargeAll } from "../../redux/actions";
import { deleteId } from './../../redux/actions';

const HomeCard = () => {
  const filtered = useSelector((state) => state.filtered);
  const Dispatch = useDispatch()
      
  const [currentPage, setCurrentPage] = useState(1)
  const [cardPerPage] = useState(8)

  //* indices de la paginación:
  const indexOfLastCard = currentPage * cardPerPage
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  // indexOfLastCard ---->1 * 8 = 8
  // indexOfFirstCard---->8-8= 0
  //slice(0,8) muestra el arreglo en el BOTON PAGINA 1 de la tarjeta 0-7 

  
  var currentCards //"cards" que se deben mostrar en la pantalla
  
  if(typeof filtered === 'string'){
      currentCards = filtered
    
  }else {
      currentCards = filtered.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que dogs muestro"
     
  } 

  const paginate = (numeroPagina) => {  //aca recibe el num clikeado gracias al onclick del pagination y setea dicho num en currentpage
    setCurrentPage(numeroPagina) 
  }

  
  const handlePrev = (event) => {
    event.preventDefault();
    if (currentPage <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (cardPerPage.length < 8) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main>
      
      <Pagination 
        cardPerPage={cardPerPage}
        totalCards={filtered.length}
        paginate={paginate}
        currentPage={currentPage}
      />
       <Button onClick={handlePrev}>Prev</Button>
       <Button onClick={handleNext}>Next</Button> 
      <CardsContainer>
          {currentCards.map((item) => (
          <CardDiv key={item.id}>
           
            <Name>{item.name}</Name>
            <ImgDiv>
              <img src={item.image} alt={item.name} />
            </ImgDiv>
            {item.temperaments ? (
              <p>
                <b>Temperaments: </b>
                {item.temperaments.join(', ')}.
              </p>
            ) : null}
             {item.breed_group? <p> <b>Group: </b>{item.breed_group}.</p>: null}
             <p>
                <b>weight: </b>
              {item.weight} KG
            </p>
            <Link to={`/dogs/${item.id}`}>DETAIL</Link>
          </CardDiv>
        ))}
      </CardsContainer>

      <Pagination
        cardPerPage={cardPerPage}
        totalCards={filtered.length}
        paginate={paginate}
        currentPage={currentPage}
      />

    </main>
  );
};



const CardsContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  
 
`;
const Name = styled.h3`
  margin-top: 0px;
  width: 100%;
  height: 40px;
`;

export const ImgDiv = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    vertical-align: top;
    border-radius: 5px;
  }
`;

export const CardDiv = styled.div`
  border-radius: 10px;
  border: lightcyan 1px solid;
  margin-top: 15px;
  width: 20%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  text-align: center;
  padding: 15px;
  background-color: rgb(197, 199, 199, 0.75);
  &:hover {
   
   background-color: lightcyan;
   transition: 0.5s;
   box-shadow: 2px 2px 2px 2px lightcyan;
    border: 5px solid lightcyan ;
 
 
}
 
 
  /* :hover {
    
  } */

  p {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: white;
    padding: 7px 15px;
    background-color: rgb(14, 53, 46);
    border-radius: 5px;
    cursor: pointer;
    margin-top: auto;
    box-shadow: 3px 2px 0 0 black;
  }
`;

const Button = styled.button `
position: relative;
 padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;
display: inline-flex;
background: #d4d4d4;
  color: black;
  justify-content: center;
  &:hover {
   
      background-color: red;
      transition: 0.5s;
      box-shadow: 1px 1px 1px 1px lightcyan;
    border: 1px  lightcyan;
    color: white
   }

`;



export default HomeCard;