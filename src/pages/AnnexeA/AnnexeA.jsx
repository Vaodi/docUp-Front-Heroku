import "./AnnexeA.scss"
import { useHistory } from 'react-router-dom';

import { useState, useEffect } from "react";
import Axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import SidebarClient from "../../component/sideBarClient/SideBarClient";
import Navebar from "../../component/navbar/Navbar";
import { Button, TextField } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { pink } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// for tge stepper
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Information', 'Déclaration', 'Scolarité' , 'Antécédents'];
// end for stepper


const initialRow = {
  De : '',
  À : '',
  NomEtablissement: '',
  Ville: '',
  Pays: '',
  Diplome: '',
  ChampsEtude: ''
};

const initialAntécédentRow = {
  De : '',
  À : '',
  Activité: '',
  Ville: '',
  Pays: '',
  Statut: '',
  NomEntreprise: ''
};

const InitialBackgroundRow = {
  De : '',
  À : '',
  Organisation: '',
  TypeOrganisation: '',
  ActivitéOrganisation: '',
  Ville: '',
  Pays: '',
  
};

const InitialChargeRow = {
  De : '',
  À : '',
  Pays: '',
  SphèreCompétence: '',
  Service: '',
  ActivitésOrPoste: '',
};



const InitialArmyRow = {
  De : '',
  À : '',
  SecteurDeService: '',
  NumeroUnite: '',
  NomCommandant: '',
  Grade: '',
  DateCombatActif: '',
  LieuCombatActif: '',
  RaisonFinService: '',
};


const InitialAdresseRow = {
  De : "",
  À : '',
  RueEtNuméroCivique: '',
  Ville: '',
  Province: '',
  CodePostal: '',
  Pays: '',

};



// console.log('something')
export default function AnnexeA() {

  
    const [name, setName] = useState("");
    const [prenom, setPrenom] = useState("");
    const [age, setAge] = useState("");


    const [dadFamilyName, setFamilyNameDad] = useState("");
    const [dadFirstName, setFirstNameDad] = useState("");
    const [dadAge, setAgeDad] = useState("");
    const [cityBirthDad, setCityBirthDad] = useState("");
    const [countryBirthDad, setCountryBirthDad] = useState("");
    const [dadDead, setDadDead] = useState("");
    const [dadDateDeath, setDadDeathDate] = useState("");

    const [momFamilyName, setFamilyNamemMom] = useState("");
    const [momFirstName, setFirstNameMom] = useState("");
    const [ageMom, setAgeMom] = useState("");
    const [cityBirthMom, setCityBirthMom] = useState("");
    const [countryBirthMom, setCountryBirthMom] = useState("");
    const [momDead, setMomDead] = useState("");
    const [momDateDeath, setMomDeathDate] = useState("");

    const [Adresse, setAdress] = useState("");
 
   
    const [startDate, setstartDate] = useState("");
    const [organisaion, setOrganisation] = useState("");
    const [chargePublique,setChargePublique] = useState("");
    const [army,setArmy] = useState("");
  
    const [isValidFormat, setIsValidFormat] = useState(true);
    const [isValidFormatAdress, setIsValidFormatAdress] = useState(true);
    const yyyyMMPattern = /^(19|20)\d\d-(0[1-9]|1[0-2])$/;

  const [endDate, setEndDate] = useState(false)
  const [endDateAdress, setEndDateAdress] = useState(false)

  const [endDateMessage, setEndDateErrorMessage] = useState(false)
  const [endDateErrorMessage, setEndDateErrorMessageAdress] = useState(false)

    // Part yes or no question : 
    const [qA, setQA] = useState("");
    const [rA, setRA] = useState("");

    const [qB, setQB] = useState("");
    const [rB, setRB] = useState("");

    const [qC, setQC] = useState("");
    const [rC, setRC] = useState("");

    const [qD, setQD] = useState("");
    const [rD, setRD] = useState("");

    const [qE, setQE] = useState("");
    const [rE, setRE] = useState("");

    const [qF, setQF] = useState("");
    const [rF, setRF] = useState("");

    const [qG, setQG] = useState("");
    const [rG, setRG] = useState("");

    const [qH, setQH] = useState("");
    const [rH, setRH] = useState("");

    const [qI, setQI] = useState("");
    const [rI, setRI] = useState("");

    const [qJ, setQJ] = useState("");
    const [rJ, setRJ] = useState("");

    const [qK, setQK] = useState("");
    const [rK, setRK] = useState("");

    // Questions about scholarity
    const [qL, setQL] = useState("");


    const [qM, setQM] = useState("");


    const [qN, setQN] = useState("");
   

    const [qO, setQO] = useState("");
    

    const [qP, setQP] = useState("");
  


    

    const [BackgroundRows, setBackgroundRows] = useState([InitialBackgroundRow]);
    const [RowNumberBack, setRowNumberBack] = useState(0);

    const [ChargeRows, setBackgroundChargeRows] = useState([InitialChargeRow]);
    const [RowNumberCharge, setRowNumberCharge] = useState([InitialChargeRow])


    const [armyBackgroundRows, setArmyBackground] = useState([InitialArmyRow]);
    const [armyRows, setArmyRows] = useState(0);


    const [AdresseRows, setAdresseRows] = useState([InitialAdresseRow]);
    const [RowNumbeAdress, setRowNumberAdress] = useState(0);

/* Shit for the stepper */

const [activeStep, setActiveStep] = React.useState(0);

const [notValidePeriod, setNotValidPeriod] = useState(false)

const isValidDatePeriod = (date) => {
  return date >= new Date(startDate) && date <= new Date(todayBis);
};

  const handleNext = (e) => {

    if (activeStep !== steps.length - 1) {
    e.preventDefault()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
     // Check if the required fields are filled
/*      if (activeStep === 0 && (name.trim() === '' || prenom.trim() === '')) {
      // Fields are not filled, you can display an error message or prevent the step change.
      alert('Please fill in all required fields.');
    } else { */
      // Proceed to the next step
     
   // }
   if (activeStep === steps.length - 1) {
    e.preventDefault();
    // Additional function to be triggered when at the final step
    sendForm();
  }
    
  
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const handleReset = () => {
    setActiveStep(0);
  };



/* End Shit for the stepper */










    const handleInputChangeAdresse = (event, rowIndex, colName) => {
      console.log("data for Adress"+ JSON.stringify(AdresseRows));
      //setEndDateErrorMessage(false)
      
   
      const updatedRows = [...AdresseRows]; // Create a shallow copy of the rows array
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex], // Create a shallow copy of the specific row
        [colName]: event.target.value // Update the specific column value
      };

      if (rowIndex > 0) {
        updatedRows[rowIndex]["De"] = updatedRows[rowIndex - 1]["À"];
      }

      if (rowIndex === 0) {
        updatedRows[rowIndex]["De"] = startDate;
      }


      setAdresseRows(updatedRows); // Update the state with the new array
    };



//----


const addAdressRow = () => {
  setRowNumberAdress(RowNumbeAdress + 1)
  setAdresseRows([...AdresseRows, InitialAdresseRow]);
};


//----







    const handleInputArmy = (event, rowIndex, colName) => {
      console.log("data for Army"+ JSON.stringify(armyBackgroundRows));
      const updatedRows = [...armyBackgroundRows]; // Create a shallow copy of the rows array
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex], // Create a shallow copy of the specific row
        [colName]: event.target.value // Update the specific column value
      };
      setArmyBackground(updatedRows); // Update the state with the new array
    };

  

    const addArmyRow = () => {
      setArmyRows(armyRows + 1)
      setArmyBackground([...armyBackgroundRows, InitialArmyRow]);
  };

    const handleInputChangeCharge = (event, rowIndex, colName) => {
      console.log("data for Organisation"+ JSON.stringify(ChargeRows));
      const updatedRows = [...ChargeRows]; // Create a shallow copy of the rows array
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex], // Create a shallow copy of the specific row
        [colName]: event.target.value // Update the specific column value
      };
      setBackgroundChargeRows(updatedRows); // Update the state with the new array
    };

    const addChargeRow = () => {
      setRowNumberCharge(RowNumberCharge + 1)
      setBackgroundChargeRows([...ChargeRows, InitialChargeRow]);
  };

  const  handleInputChangeOrganisation = (event, rowIndex, colName) => {
    console.log("data for lol"+ JSON.stringify(BackgroundRows));
    const updatedRows = [...BackgroundRows]; // Create a shallow copy of the rows array
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex], // Create a shallow copy of the specific row
      [colName]: event.target.value // Update the specific column value
    };
    setBackgroundRows(updatedRows); // Update the state with the new array
  };

  const addBackgroundRow = () => {
    setRowNumber(RowNumberBack + 1)
    setBackgroundRows([...BackgroundRows, InitialBackgroundRow]);
  };

  const deleteChargeRow = (index) => {
    const updatedRows = [...BackgroundRows];
    updatedRows.splice(index, 1);
    setBackgroundRows(updatedRows);
  }

  const deletePublicChargeRow = (index) => {
    const updatedRows = [...ChargeRows];
    updatedRows.splice(index, 1);
    setBackgroundChargeRows(updatedRows);
  }

  const deleteArmyRow = (index) => {
    const updatedRows = [...armyRows];
    updatedRows.splice(index, 1);
    setArmyBackground(updatedRows);
  }


const [todayBis,setToday] = useState("")

function calculateShortestScenario(newDate) {
  // Parse the user's birthday string into a Date object
  setAge(newDate)
  const birthday = new Date(newDate);

  // Get today's date
  const today = new Date();


  const options = { year: 'numeric', month: '2-digit' };
  // Scenario 1: Time since user is 18 years old
  const eighteenYearsAgo = new Date(birthday);
  eighteenYearsAgo.setFullYear(birthday.getFullYear() + 18);

          // to format the date
          const dateObj = new Date(eighteenYearsAgo);
          const date = dateObj.toLocaleString('en-CA', options);

          console.log("isac"+ today.toLocaleString('en-CA', options))
          setToday(today.toLocaleString('en-CA', options))
        

  // Scenario 2: Last 10 years
  const tenYearsAgo = new Date(today);
  tenYearsAgo.setFullYear(today.getFullYear() - 10);

           // to format the date
           const dateObj10 = new Date(tenYearsAgo);
           const date10 = dateObj10.toLocaleString('en-CA', options);

  // Calculate the time differences in milliseconds
  const timeDifferenceScenario1 = today - eighteenYearsAgo;
  const timeDifferenceScenario2 = today - tenYearsAgo;

  // Compare the time differences and return the shortest scenario
  if (timeDifferenceScenario1 < timeDifferenceScenario2) {
    //scenario 18 ans
    console.log("le chemin le plus court est 18 ans, donc à compléter depuis : " + date)
     setstartDate(date)
  } else {
    console.log("le chemin le plus court est 10 ans, donc à compléter depuis : " + date10)
    setstartDate(date10)
  }
}



/*     const isValidDateFormat = (input) => {
      const regex =  /^2\d{3}\s?-\s?(0[1-9]|1[0-2])$/;
      return regex.test(input);
    }; */
    
    // to handle table for scholarity
    const [rows, setRows] = useState([initialRow]);

    const addRow = () => {
      setRows([...rows, initialRow]);
    };

    const deleteRow = (index) => {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    };

    const deleteAdressRow = (index) => {
      const updatedRows = [...AdresseRows];
      updatedRows.splice(index, 1);
      setAdresseRows(updatedRows);
    };





    const handleInputChange = (event, rowIndex, colName) => {
      console.log("data for school"+ JSON.stringify(rows));
      const updatedRows = [...rows]; // Create a shallow copy of the rows array
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex], // Create a shallow copy of the specific row
        [colName]: event.target.value // Update the specific column value
      };
      setRows(updatedRows); // Update the state with the new array
    };

    // to handle table for antecedents

    const [AntécédentRows, setAntécédentRows] = useState([initialAntécédentRow]);
    const [RowNumber, setRowNumber] = useState(0);

    const addAntécédentRow = () => {
      if (isValidFormat && !notValidePeriod){
        console.log("johny is good")
   //setRowNumber(RowNumber + 1)
   setAntécédentRows([...AntécédentRows, initialAntécédentRow]);
      } else {
        if (!isValidFormat) { 
        alert("Attention, la date doit être au format AAAA-MM, merci de corriger pour pouvoir ajouter une ligne")
        }
        if (notValidePeriod) {
          alert("Attention, la période doit être comprise entre " + JSON.stringify(startDate) + "et " + JSON.stringify(todayBis) )
        }
      }
   
    };

    const deleteAntecedentRow = (index) => {
      console.log("Trying to delete an antecedent row")
      const updatedRows = [...AntécédentRows];
      updatedRows.splice(index, 1);
      setAntécédentRows(updatedRows);
    };

    const handleInputChangeAntecedent = (event, rowIndex, colName, previousDate) => {
      console.log("data for antécédents"+ JSON.stringify(AntécédentRows));
      console.log("zaaab"+ JSON.stringify(AntécédentRows[0]["À"]));
      const inputDate = new Date(event.target.value);
      console.log('my date' + inputDate)

     
  if (colName === "À") {

      if (isValidDatePeriod(inputDate)) {
        setNotValidPeriod(false)
      
      const updatedRows = [...AntécédentRows]; // Create a shallow copy of the rows array
  updatedRows[rowIndex] = {
    ...updatedRows[rowIndex], // Create a shallow copy of the specific row
    [colName]: event.target.value, // Update the specific column value
  };

  if (rowIndex > 0) {
    updatedRows[rowIndex]["De"] = updatedRows[rowIndex - 1]["À"];
  }

  if (rowIndex === 0) {
    updatedRows[rowIndex]["De"] = todayBis;
  }

  setAntécédentRows(updatedRows);
    } else {
      setNotValidPeriod(true)
    } 
  
  } else {
    const updatedRows = [...AntécédentRows]; // Create a shallow copy of the rows array
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex], // Create a shallow copy of the specific row
      [colName]: event.target.value, // Update the specific column value
    };
  
    if (rowIndex > 0) {
      updatedRows[rowIndex]["De"] = updatedRows[rowIndex - 1]["À"];
    }
  
    if (rowIndex === 0) {
      updatedRows[rowIndex]["De"] = todayBis;
    }
  
    setAntécédentRows(updatedRows);

  }

} 
    
  
    //

    const { id } = useParams()

    
    const [data, setData] = useState();


useEffect(() => {
    Axios ({
       method: "GET",
      withCredentials: true,
        url: "https://docup-backend-d5e8d90cd77f.herokuapp.com/auth",
 
     
      }).then((res) => {
       setData(res.data);
       console.log(res.data);
       console.log("bob l'epong eseeeeeet " + JSON.stringify(data));
       
      });
 }, []) 
   

 const sendForm = async (e) => {
   // e.preventDefault();
   
 
       console.log("I am in new client function now");
     
       if (endDate && isValidFormat && endDateAdress) {
        console.log("oui")
       
       try {
         await Axios ({
             method: "PUT",
             withCredentials: true,
             data: {            
                 // Cette partie sera à ajouter dans la page AnnexeA/:id (par exemple) qui est la page qui montre le questionnaire
                 // Annexe A. Dans formToComp Schema, tu ajoutes les forms que client doit compléter. Then display ces forms dans le 
                 // tableau. Dans "view", il va aller dans la page AnnexeA/:id. Donc ce modèle suppose un form = une page. 
                 consultantID: data._id,
                forms: [
                     {
                       name: "Annexe A",
                       questions: [
                         {
                           question: "Nom",
                           answer: name,
                         },
                         {
                           question: "Prenom",
                           answer: prenom,
                         },
                         {
                            question: "date de naissance",
                            answer: age,
                          },


                         {
                            question: "Nom de famille du père",
                            answer: dadFamilyName,
                          },
                         {
                            question: "Prénom du père",
                            answer: dadFirstName,
                          },
                         {
                            question: "date de naissance du père",
                            answer: dadAge,
                          },
                  
                         {
                            question: "Ville de naissance du père",
                            answer: cityBirthDad,
                          },
                         {
                            question: "Pays de naissance du père",
                            answer: countryBirthDad,
                          },
                         {
                            question: "Votre père est il décédé ?",
                            answer: dadDead,
                          },
                    
                         {
                            question: "Si oui, date du décès",
                            answer: dadDateDeath,
                          },


                         {
                            question: "Nom de famille mère",
                            answer: momFamilyName,
                          },
                         {
                            question: "Prénom de la mère",
                            answer: momFirstName,
                          },
                         {
                            question: "date de naissance de la mère",
                            answer: ageMom,
                          },
                    
                         {
                            question: "Ville de naissance de la mère",
                            answer: cityBirthMom,
                          },
                         {
                            question: "Pays de naissance de la mère",
                            answer: countryBirthMom,
                          },
                         {
                            question: "Votre mère est elle décédé ?",
                            answer: momDead,
                          },
                  
                         {
                            question: "Si oui, date du décès",
                            answer: momDateDeath,
                          },
                    



                          {
                            question: "1- Avez déjà été reconnu coupable d'un crime ou un délit au Canada pour lequel un pardon n'a pas été accordé en vertu de la Loi sur le casier judiciare ?",
                            answer: qA,
                          },
                          {
                            question: "1- Si oui, lequel ?",
                            answer: rA,
                          },
                          {
                            question: "2- Avez déjà été reconnu coupable, ou êtes vous actuellement accusé, jugé pour, associé à un crime ou un délit, ou sujet à des procédures judiciaires dans un autre pays ou territoire ?",
                            answer: qB,
                          },
                          {
                            question: "2- Si oui, lequel ?",
                            answer: rB,
                          },
                          {
                            question: "3- Avez déjà présenté une demande d'asile au Canada ou dans un bureau canadien des visas à l'étranger, auprès d'un autre pays ou territoire(s), ou auprès du Haut Commisariat des Nations Unies pour les réfugiés (HCR) ?",
                            answer: qC,
                          },
                          {
                            question: "3- Si oui, lequel ?",
                            answer: rC,
                          },
                          {
                            question: "4- Avez déjà reçu le refus du statut de réfugié, un visa d'immigrant ou de résident permanent (incluant un Certificat de sélection du Québec (CSQ) ou demande au Programme des candidats des provinces) ou de visiteur ou de résident temporaire pour aller au Canada ou dans tout autre pays ou territoire ?",
                            answer: qD,
                          },
                          {
                            question: "4- Si oui, lequel ?",
                            answer: rD,
                          },
                          {
                            question: "5- Avez déjà reçu le refus d'admission au Canada ou dans tout autre pays ou territoire, ou reçu l'ordre de quitter le Canada ou tout autre pays ou territoire ?",
                            answer: qE,
                          },
                          {
                            question: "5- Si oui, lequel ?",
                            answer: rE,
                          },
                          {
                            question: "6- Avez déjà participé à un acte de génocide, à un crime de guerre ou à la perpétration d'un crime contre l'humanité ?",
                            answer: qF,
                          },
                          {
                            question: "6- Si oui, lequel ?",
                            answer: rF,
                          },
                          {
                            question: "7- Avez déjà utilisé, planifié d'utiliser ou prôné une lutte armée ou la violence pour atteindre des objectifs politiques, religieux ou sociaux ?",
                            answer: qG,
                          },
                          {
                            question: "7- Si oui, lequel ?",
                            answer: rG,
                          },
                          {
                            question: "8- Avez déjà été associé un groupe qui a utilisé, utilise, a prçoné ou prône une lutte armée ou la violence pour atteindre des objectifs politiques, religieux ou sociaux ?",
                            answer: qH,
                          },
                          {
                            question: "8- Si oui, lequel ?",
                            answer: rH,
                          },
                          {
                            question: "9- Avez déjà été membre d'une organisation qui est ou a été engagée dans une activité qui s'inscrit dans le cadre d'une activité criminelle ?",
                            answer: qI,
                          },
                          {
                            question: "9- Si oui, lequel ?",
                            answer: rI,
                          },
                          {
                            question: "10 - Avez déjà été gardé en détention, incarcéré ou en prison ?",
                            answer: qJ,
                          },
                          {
                            question: "10- Si oui, lequel ?",
                            answer: rJ,
                          },
                          {
                            question: "11- Avez déjà souffert d'une maladie grave ou d'un désordre physique ou mental ?",
                            answer: qK, 
                          },
                          {
                            question: "11- Si oui, lequel ?",
                            answer: rK,
                          },
                          {
                            question: "Nombre d'année Élémentaire/École primaire",
                            answer: qL,
                          },
                          {
                            question: "Nombre d'année Collège",
                            answer: qM,
                          },
                          {
                            question: "Nombre d'année Université/Collège",
                            answer: qN,
                          },
                          {
                            question: "Nombre d'année École de formation professionelle ou autre école secondaire",
                            answer: qO,
                          },
                        
                          {
                            question: "Voici les Périodes Scolaires ",
                            // HARD CODED EXAMPLE OF WHAT I USED : [{"col1":"un","col2":"","col3":"","col4":"","col5":"","col6":"","col7":""},{"col1":"deu","col2":"","col3":"","col4":"","col5":"","col6":"","col7":""}]
                            period: rows,
                          },
                          {
                            question:"Voici les Antécédents  ",
                            period:AntécédentRows
                          },
                          {
                            question:"Liste des Adresses ",
                            period:AdresseRows
                          },
                          {
                            question:"Voici les Organisations",
                            period:BackgroundRows
                          },
                          {
                            question:"Section sur les charges publiques :",
                            period:ChargeRows
                          },
                          {
                            question:"Section sur l'armée :",
                            period:armyBackgroundRows
                          },
                       ],
                     },

                ]
            /*      documents : [
                     {
                         docName: newDocs.[0].label
                     }
     
                 ] */
             },
              url : "https://docup-backend-d5e8d90cd77f.herokuapp.com/update/sendForm/" + id,
           timeout: 10000,
         })
        ;
        window.location.href = '/forms-to-complete/' + id
        // window.location.reload();
       } catch (error) {
         console.log(error);
       }
     } else {
      if (!endDate) {
        setEndDateErrorMessage(true)
        alert("Merci de corriger les erreurs (en rouge) dans le tableau des antécédents")
      }
      if (!endDateAdress) {
        setEndDateErrorMessageAdress(true)
        alert("Merci de corriger les erreurs (en rouge) dans le tableau des adresses")
      }
   
      
   
     }} 
  


    
if (data === undefined) {

    return (<>Still loading...</>)
}

if (!data){
    return 
    <h1>Not allowed</h1>
    
} else
console.log("this is the loaded data  " + JSON.stringify(data))



// console.log("this is the user  " + user)
    return(
        <div className="home">
        <SidebarClient/>
   

    <div className="homeContainer">
    <Navebar/>

        <div className="AnnexeOverall"> 
        <h1 className="AnnexeTitle">Annexe A : for {data.username} </h1>
        {/* <form onSubmit={changeonclick} encType="multipart/form-data"> */}
{/*         <p>These are the documents needed</p>
    {data.documents.map(createDocument)} */}
    {/* <label htmlFor="file">Choose article image</label>
       <input type="file" fileName="doc_upload"  onChange={onChangeFile}/>
     
        <button type="submit">Uploaaaad</button>

       </form> */}

       <div className="AnnexeAform">
       <form className="styleForForm" onSubmit={handleNext}>
       <Box sx={{ marginTop:'3%', width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : 

       /* STTTEP 00000000000 */

      activeStep === 0 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>

<div>
<div className="AnnexeName">

<div className="labelAndInput">
          <label>Nom</label>
       <input required className="annexeInput" type="text" onChange={(e) => setName(e.target.value)} />
</div>
<div>
       <label>Prénom</label>
       <input required type="text"  onChange={(e) => setPrenom(e.target.value)}  />
</div>

<div>
       <label>Date de naissance</label>
       <TextField required size="small" type="date" placeholder="Enter Deadline" onChange={(e) => calculateShortestScenario(e.target.value)}
      style={{ marginLeft: '30px', boxSizing: 'border-box' }} />
      </div>
</div>

<div className="AnnexeFather">


<h3>Détails concernant votre père</h3>

<div className="allInfoFather">

<div>

<div className="nomPrenomDaron">
<div>
       <label>Nom de famille du père</label>
       <input required className="inputAnnexe" type="text"  onChange={(e) => setFamilyNameDad(e.target.value)} />
</div>
<div>
       <label>Prénom du père</label>
       <input required className="inputAnnexe" type="text"  onChange={(e) => setFirstNameDad(e.target.value)} />
</div>
  <div>
       <label>Date de naissance du père </label>
       <TextField required className="inputAnnexe" size="small" type="date" placeholder="Enter Deadline" onChange={(e) => setAgeDad(e.target.value)}
      style={{boxSizing: 'border-box' }} />
   </div>
</div>






<div className="villeNaissance">

    <div>
       <label >Ville de naissance du père </label>
       <input required type="text"  onChange={(e) => setCityBirthDad(e.target.value)} />
</div>

<div>

       <label>Pays de naissance du père </label>
       <input required type="text"  onChange={(e) => setCountryBirthDad(e.target.value)} />
</div>



        </div>

        <div className="decePere">

<label>Votre père est il décédé ? </label>

<select required name="père-décès" onChange={(e) => setDadDead(e.target.value)} >
<option value="">--Veuillez séléctionner--</option>
<option value="oui">Oui</option>
<option value="non">Non</option>
 </select>
 </div>

        {dadDead === "oui" ? (
            <div className="dateDece">
            <label>Date de décès du père </label>
            <TextField required size="small" type="date" placeholder="Enter Deadline" onChange={(e) => setDadDeathDate(e.target.value)}
            style={{ marginLeft: '30px', boxSizing: 'border-box' }} />
            </div>
        ) : null}
        </div>   
</div>
</div>

<div className="AnnexeMother">
 <h3>Détails concernant votre mère</h3>




 <div className="nomPrenomDaronne">


 <div>
<label>Nom de famille de la mère</label>
<input required className="inputAnnexeLow" type="text"  onChange={(e) => setFamilyNamemMom(e.target.value)} />
</div>

<div>
<label>Prénom de la mère</label>
<input required className="inputAnnexeLow" type="text"  onChange={(e) => setFirstNameMom(e.target.value)} />
</div>

<div>
<label>Date de naissance de votre mère </label>
<TextField required size="small" type="date" placeholder="Enter Deadline" onChange={(e) => setAgeMom(e.target.value)}
style={{ marginLeft: '30px', boxSizing: 'border-box' }} />
</div>



</div>

<div className="momRow2">

<div>
<label>Ville de naissance de votre mère </label>
<input required type="text"  onChange={(e) => setCityBirthMom(e.target.value)} />
</div>

<div>
<label>Pays de naissance de votre mère </label>
<input required type="text"  onChange={(e) => setCountryBirthMom(e.target.value)} />
</div>

</div>

<div className="meredece">
<label>Votre mère est elle décédé ? </label>
<select required name="père-décès" onChange={(e) => setMomDead(e.target.value)} >
<option value="">--Veuillez séléctionner--</option>
<option value="oui">Oui</option>
<option value="non">Non</option>
 </select>
</div>

 {momDead === "oui" ? (
     <div>
     <label>Date de décès de la mère </label>
     <TextField required size="small" type="date" placeholder="Enter Deadline" onChange={(e) => setMomDeathDate(e.target.value)}
     style={{ marginLeft: '30px', boxSizing: 'border-box' }} />
     </div>
 ) : null}
 </div>
 </div>


          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
       

            <Button sx={{marginBottom : '10%'}} variant="contained" type="submit">
              {activeStep === steps.length - 1 ? 'Finish' : 'Suivant'}
            </Button>
          </Box>
        </React.Fragment>
        
      ) : 
      /* STTEEEEPP 111111 */
      activeStep === 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>

          <h4>Est-ce que vous même ou, si vous êtes le requérent principal, l'un des membres de votre famille nommés sur la demande de résidence permanente au Canada : </h4>
      
      <div className="yesNo">

      <div className="yesNoPackage">
      <label>avez déjà été reconnu coupable d'un crime ou un délit au Canada pour lequel un pardon n'a pas été accordé en vertu de la Loi sur le casier judiciare ?</label>
      <select required onChange={(e) => setQA(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>
     


      {qA === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required type="text"  onChange={(e) => setRA(e.target.value)}  />
            </div>
        ) : null }

        </div>

        <div className="yesNoPackage">
      <label>avez déjà été reconnu coupable, ou êtes vous actuellement accusé, jugé pour, associé à un crime ou un délit, ou sujet à des procédures judiciaires dans un autre pays ou territoire ?</label>
      <select required onChange={(e) => setQB(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qB === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRB(e.target.value)}  type="text"   />
            </div>
        ) : null }

      </div>

      <div className="yesNoPackage">
      <label>avez déjà présenté une demande d'asile au Canada ou dans un bureau canadien des visas à l'étranger, auprès d'un autre pays ou territoire(s), ou auprès du Haut Commisariat des Nations Unies pour les réfugiés (HCR) ?</label>
      <select required onChange={(e) => setQC(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qC === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRC(e.target.value)}  type="text"   />
            </div>
        ) : null }
        </div>

        <div className="yesNoPackage">
      <label>avez déjà reçu le refus du statut de réfugié, un visa d'immigrant ou de résident permanent (incluant un Certificat de sélection du Québec (CSQ) ou demande au Programme des candidats des provinces) ou de visiteur ou de résident temporaire pour aller au Canada ou dans tout autre pays ou territoire ?</label>
      <select required onChange={(e) => setQD(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>
   

      {qD === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRD(e.target.value)} type="text"   />
            </div>
        ) : null }

        </div>

        <div className="yesNoPackage">
      <label>avez déjà reçu le refus d'admission au Canada ou dans tout autre pays ou territoire, ou reçu l'ordre de quitter le Canada ou tout autre pays ou territoire ?</label>
      <select required onChange={(e) => setQE(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qE === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRE(e.target.value)}  type="text"   />
            </div>
        ) : null }
        </div>

        <div className="yesNoPackage">
      <label>avez déjà participé à un acte de génocide, à un crime de guerre ou à la perpétration d'un crime contre l'humanité</label>
      <select required onChange={(e) => setQF(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qF === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRF(e.target.value)}  type="text"   />
            </div>
        ) : null }
        </div>


        <div className="yesNoPackage">
      <label>avez déjà utilisé, planifié d'utiliser ou prôné une lutte armée ou la violence pour atteindre des objectifs politiques, religieux ou sociaux ?</label>
      <select required onChange={(e) => setQG(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qG === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRG(e.target.value)}  type="text"   />
            </div>
        ) : null }
        </div>


        <div className="yesNoPackage">
      <label>avez déjà été associé  un groupe qui a utilisé, utilise, a prçoné ou prône une lutte armée ou la violence pour atteindre des objectifs politiques, religieux ou sociaux ?</label>
      <select required onChange={(e) => setQH(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qH === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRH(e.target.value)}  type="text"   />
            </div>
        ) : null }

        </div>

        <div className="yesNoPackage">
      <label>avez déjà été membre d'une organisation qui est ou a été engagée dans une activité qui s'inscrit dans le cadre d'une activité criminelle ?</label>
      <select required onChange={(e) => setQI(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qI === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRI(e.target.value)}  type="text"   />
            </div>
        ) : null }
        </div>

        <div className="yesNoPackage">
      <label>Avez déjà été gardé en détention, incarcéré ou en prison ?</label>
      <select required onChange={(e) => setQJ(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qJ === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRJ(e.target.value)}  type="text"   />
            </div>
        ) : null }
        </div>

        <div className="yesNoPackage">
      <label>Avez déjà souffert d'une maladie grave ou d'un désordre physique ou mental ?</label>
      <select required onChange={(e) => setQK(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>

      {qK === "oui" ? (
            <div>
            <label>Donner des précisions</label>
            <input required onChange={(e) => setRK(e.target.value)}  type="text"   />
            </div>
        ) : null }

</div>
</div>




          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
       

            <Button sx={{marginBottom : '10%'}} variant="contained" type="submit">
              {activeStep === steps.length - 1 ? 'Finish' : 'Suivant'}
            </Button>
          </Box>
        </React.Fragment>
      ) : 

      activeStep === 2 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
          <h4 className="yesNoPackage">Indiquez le nombre d'années d'études que vous avez réussies pour chacun des niveau d'études suivants :</h4>
          <h5 className="yesNoPackage"> <WarningIcon color="success" sx={{ color: pink[500]}} />Inscrire le chiffre 0 si vous n'avez pas fréquenté le niveau </h5>

      <div className="schoolNumber">
      <div>
    <label>Élémentaire / École Primaire</label>
    <input required className="inputAnnexe" onChange={(e) => setQL(e.target.value)}  type="text" />
    </div>
    <div>
    <label>Collège</label>
    <input required className="inputAnnexe" onChange={(e) => setQM(e.target.value)}  type="text" />
    </div>
    <div>
    <label>Université et Lycée</label> 
    <input required className="inputAnnexe" onChange={(e) => setQN(e.target.value)}  type="text"  />
    </div>


</div>

<div className="meredece">
    <label>École de formation professionnelle ou autre école post-collège</label>
    <input required className="inputAnnexe" onChange={(e) => setQO(e.target.value)} type="text"  />
    </div>

     {/* Table for scholarity : */}
<div>

  <p className="yesNoPackage">Donnez des précisions sur toutes les études faites <span className="important" >depuis le collège </span> (y compris celles de niveau universitaire ou lycée et formation professionnelle) que vous avez faites.</p>
  <p>Inscrire S.O dans chaque case si aucune étude n'a été faite.</p>
</div>

     <div className="yesNoPackage">
      <table>
        <thead>
          <tr className="textColumn">
            <th>De (AAAA-MM)</th>
            <th>À (AAAA-MM) </th>
            <th>Nom de l'école</th>
            <th>Ville</th>
            <th>Pays</th>
            <th>Diplôme décerné <br />
            <span style={{ fontSize: '10px' }}>(BAC, License, Brevet etc.)</span>
            </th>
            <th>Spécialité <br/>
            <span style={{ fontSize: '10px' }}>(Math, Finance etc.)</span>
            </th>

          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((colName, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[colName]}
                    onChange={(event) => handleInputChange(event, rowIndex, colName)}
                    required
                    
                  />
                </td>
              ))}
              <td>
              {rowIndex === 0 ? null : ( 
                <Button variant="outlined" color="error" size="small" style={{ marginLeft:'5px', fontSize: '8px'}}onClick={() => deleteRow(rowIndex)}>Supprimer Ligne</Button>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outlined" color="success" size="small" style={{ marginTop:'10px', marginLeft:'5px', fontSize: '12px'}} onClick={addRow}>Ajouter Ligne</Button>
    </div>




          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
       

            <Button sx={{marginBottom : '10%'}} variant="contained" type="submit">
              {activeStep === steps.length - 1 ? 'Finish' : 'Suivant'}
            </Button>
          </Box>
        </React.Fragment>
      ): 
      activeStep === 3 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
        <h4 className="yesNoPackage">Antécédents personnels</h4>
    <div className="yesNoPackage">
    
    <div className="txtAntecedent">
    <span >Veuillez préciser vos antécédents personnels depuis le {startDate} jusqu'à aujourd'hui, soit le {todayBis}. <br/>
    <br/>À la section "Activité", <span className="important">inscrivez votre profession </span>si vous travailliez. <br/> 
    <span className="important">Si vous ne travailliez pas, donnez des renseignements sur ce que vous faisiez </span>(ex : chômage, étude, voyage, retraite, en détention etc.). 
  
<br/>Indiquez également votre statut d'immigration dans ce pays (citoyen, touriste, étudiant etc.).</span>
<br/><span>Attention : ne laissez aucune période de temps inexpliqué </span>
<br/> Votre tableau doit finir par : {startDate}
<span>
</span>
</div>
<div className="yesNoPackage">

<Accordion style={{ width: '100%', backgroundColor:'#eeeeee' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Voir Example (cliquez ici)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table >
          <thead>
  <tr >
    <th className="border">De (AAAA-MM)</th>
    <th className="border">À (AAAA-MM)</th>
    <th className="border">Activité</th>
    <th className="border">Ville</th>
    <th className="border">Pays</th>
    <th className="border">Statut dans le pays</th>
    <th className="border">Nom de l'entreprise</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td className="border">{todayBis}</td>
    <td className="border important">2019-03</td>
    <td className="border">Architecte</td>
    <td className="border">Paris</td>
    <td className="border">France</td>
    <td className="border">Citoyen</td>
    <td className="border">Cabinet Deco&Home</td>
  </tr>
  <tr>
    <td className="border important">2019-03</td>
    <td className="border importantBis">2019-02</td>
    <td className="border">Chômage</td>
    <td className="border">Londre</td>
    <td className="border">Angleterre</td>
    <td className="border">Touriste</td>
    <td className="border">Sans Objet</td>
  </tr>
  <tr>
    <td className="border importantBis">2019-02</td>
    <td className="border">{startDate}</td>
    <td className="border">Étudiant</td>
    <td className="border">New-York</td>
    <td className="border">États-Unis</td>
    <td className="border">Étudiant</td>
    <td className="border">NY university</td>
  </tr>
  </tbody>
</table>
          </Typography>
        </AccordionDetails>
      </Accordion>

</div>


    <p>{notValidePeriod && (
  <span style={{ color: 'red' }}>Attention ! La période doit être comprise entre {startDate} et {todayBis}</span>
)}</p>
    <p>{!isValidFormat && (
  <span style={{ color: 'red' }}>La date doit être au format AAAA-MM</span>
)}</p>
    <p>{endDateMessage && (
  <span style={{ color: 'red' }}> Votre tableau doit finir par : {startDate}  
  </span>
)}</p>
</div>




    <div className="yesNoPackage">
    <table>
      <thead>
        <tr className="textColumn">
          <th>De (AAAA-MM)</th>
          {/* Other header cells */}
          <th>À (AAAA-MM) </th>
            <th>Activité</th>
            <th>Ville</th>
            <th>Pays</th>
            <th>Statut dans le pays</th>
            <th>Nom de l'entreprise </th>
       
        </tr>
      </thead>
      <tbody>
        {AntécédentRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((colName, colIndex) => (
              
              <td key={colIndex}>
              {colName === "De" && rowIndex !== 0 ? (
                <input
                  type="text"
                  value={AntécédentRows[rowIndex - 1]["À"]}
                  required
                  onChange={(event) => handleInputChangeAntecedent(event, rowIndex, colName, AntécédentRows[rowIndex - 1]["À"])}
                />
              ): 
                
                rowIndex === 0 && colName === "De" ? (
                <input
                  type="text"
                  value= {todayBis}
                  onChange={(event) => handleInputChangeAntecedent(event, rowIndex, colName)}
                  required
                />
              ) :
              rowIndex !== 0 && colName === "À" ? (
                <input
                  type="text"
                  required
                  onChange={(event) => {
                    setEndDateErrorMessage(false)
    const newValue = event.target.value;
    if (newValue.match(yyyyMMPattern)) {
      setIsValidFormat(true);
      handleInputChangeAntecedent(event, rowIndex, colName);
      if (newValue === startDate) {
        console.log("dans la matrice")
        setEndDate(true)
      } else {
        setEndDate(false)
      }
    } else {
      setIsValidFormat(false);
    }}}
                />
              ) :

              rowIndex === 0 && colName === "À" ? (
                <input
                  type="text"
                  required
                  onChange={(event) => {
                    setEndDateErrorMessage(false)
    const newValue = event.target.value;
    if (newValue.match(yyyyMMPattern)) {
      setIsValidFormat(true);
     handleInputChangeAntecedent(event, rowIndex, colName);
      if (newValue === startDate) {
        console.log("dans la matrice")
        setEndDate('yesss')
      } else {
        setEndDate(false)
      }
    } else {
      setIsValidFormat(false);
    }}}  />
              ):


                (
                  
                  <input
                    type="text"
                    value={row[colName]}
                    onChange={(event) => handleInputChangeAntecedent(event, rowIndex, colName)}
                    required
                  />
                )}

             
              </td>
            ))}
            <td>
            {rowIndex === 0 ? null : ( 
                <Button variant="outlined" color="error" size="small" style={{  fontSize: '8px'}}onClick={() => deleteAntecedentRow(rowIndex)}>Supprimer Ligne</Button>
              )}
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Button variant="outlined" color="success" size="small" style={{ marginTop:'10px', marginLeft:'5px', fontSize: '12px'}} onClick={addAntécédentRow}>Ajouter Ligne</Button>
  </div>

<div className="yesNoPackage">
<div>

<div>
  <label>Avez déjà appartenu à une organisation ? Entre autres, une organisation politique,sociale, de jeunes, ou d'étudiants, des syndicats et des associations professionnelles. </label>
      <select required onChange={(e) => setOrganisation(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>
</div>


      {organisaion ==="oui" ?(
            <div>
        
    <div className="yesNoPackage">
    <p>N'utilisez pas d'abréviation. Prenez soin d'indiquer dans quelle ville et quel pays ou territoire. Merci d'indiquer plus de précisions à ce sujet dans le tableau suivant : </p>
      <table>
        <thead>
          <tr className="textColumnSmaller">
            <th>De (AAAA-MM)</th>
            <th>À (AAAA-MM) </th>
            <th>Nom de l'organisaion</th>
            <th>Type d'organisaion</th>
            <th>Activités et/ou postes occupés</th>
            <th>Ville</th>
            <th>Pays</th>
       
          </tr>
        </thead>
        <tbody>
          {BackgroundRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((colName, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                   required
                    value={row[colName]}
                    onChange={(event) => handleInputChangeOrganisation(event, rowIndex, colName)}
                    
                  />
                </td>
              ))}
              <td>
              {rowIndex === 0 ? null : ( 
                <Button variant="outlined" color="error" size="small" style={{ marginLeft:'5px', fontSize: '8px'}} onClick={() => deleteChargeRow(rowIndex)}>Supprimer Ligne</Button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outlined" color="success" size="small" style={{ marginTop:'10px', marginLeft:'5px', fontSize: '12px'}} onClick={addBackgroundRow}>Ajouter Ligne</Button>
    </div>

            </div>
        ) : null }

        <div style={{ marginTop:'10px'}}>
        <label>Avez vous déjà occupé des charges publiques (par exemple fonctionnaire, juge, policier employé d'une agence de renseignement)</label>
      <select required onChange={(e) => setChargePublique(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>
     </div>


      {chargePublique ==="oui" ?(
            <div>
        
    <div className="yesNoPackage">
    <p>Merci d'indiquer plus de précisions à ce sujet dans le tableau suivant. Merci d'indiquer toutes les charges occupées avant ou après votre retraire : </p>
      <table className="textColumnSmaller" >
        <thead>
          <tr>
            <th>De (AAAA-MM)</th>
            <th>À (AAAA-MM) </th>
            <th>Pays ou territoire</th>
            <th>Sphère de compétence</th>
            <th>Service/Direction</th>
            <th>Activités et/ou postes occupés</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ChargeRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((colName, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[colName]}
                    onChange={(event) => handleInputChangeCharge(event, rowIndex, colName)}
                    required
                  />
                </td>
              ))}
              <td>
              {rowIndex === 0 ? null : ( 
                <Button variant="outlined" color="error" size="small" style={{ marginLeft:'5px', fontSize: '8px'}} onClick={() => deletePublicChargeRow(rowIndex)}>Supprimer Ligne</Button>)}
              
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outlined" color="success" size="small" style={{ marginTop:'10px', marginLeft:'5px', fontSize: '12px'}} onClick={addChargeRow}>Ajouter Ligne</Button>
    </div>

            </div>
        ) : null }


<div style={{ marginTop:'10px'}}>
        <label>Avez vous déjà effectué votre service militaire et/ou paramilitaire ?</label>
      <select required onChange={(e) => setArmy(e.target.value)} >
      <option value="">--Veuillez séléctionner--</option>
      <option value="oui">Oui</option>
      <option value="non">Non</option>
      </select>
</div>

      {army ==="oui" ?(
            <div>
        
    <div className="yesNoPackage">
    <p>Merci d'indiquer plus de précisions à ce sujet dans le tableau suivant : </p>
      <table className="textColumnSmaller">
        <thead>
          <tr>
            <th>De (AAAA-MM)</th>
            <th>À (AAAA-MM)</th>
            <th>Secteur de service</th>
            <th>Numéro de l'unité</th>
            <th>Nom du commandant</th>
            <th>Grade(s)</th>
            <th>Date de tout combat actif</th>
            <th>Lieu de tout combat actif</th>
            <th>Raison de la fin de votre service</th>
          </tr>
        </thead>
        <tbody>
          {armyBackgroundRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((colName, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[colName]}
                    onChange={(event) => handleInputArmy(event, rowIndex, colName)}
                    required
                  />
                </td>
              ))}
              <td>
              {rowIndex === 0 ? null : ( 
                <Button variant="outlined" color="error" size="small" style={{ marginLeft:'5px', fontSize: '8px'}} onClick={() => deleteArmyRow(rowIndex)}>Supprimer Ligne</Button>)}
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outlined" color="success" size="small" style={{ marginTop:'10px', marginLeft:'5px', fontSize: '12px'}} onClick={addArmyRow}>Ajouter ligne</Button>
    </div>

            </div>
        ) : null }

</div>
</div>

        <h4 className="yesNoPackage">Adresse</h4>
    <div className="yesNoPackage">
    <span>Inscrivez toutes les adresses où vous avez résidé depuis le {startDate}. Ne laissez aucune période inexpliqué. Voir l'exemple pour plus de précisions </span>

    <div className="yesNoPackage">

<Accordion style={{ width: '100%', backgroundColor:'#eeeeee' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Voir Example (cliquer ici)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <table >
          <thead>
  <tr >
    <th className="border">De (AAAA-MM)</th>
    <th className="border">À (AAAA-MM)</th>
    <th className="border">Rue et numéro civique</th>
    <th className="border">Ville</th>
    <th className="border">Province, État ou District</th>
    <th className="border">Code postal</th>
    <th className="border">Pays ou territoire</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td className="border">{todayBis}</td>
    <td className="border important">2019-03</td>
    <td className="border">3204 rue Saint-Bernard</td>
    <td className="border">Paris</td>
    <td className="border">France</td>
    <td className="border">70123</td>
    <td className="border">France</td>
  </tr>
  <tr>
    <td className="border important">2019-03</td>
    <td className="border importantBis">2019-02</td>
    <td className="border">1234 Jean-Talon Ouest</td>
    <td className="border">Montreal</td>
    <td className="border">Quebec</td>
    <td className="border">H2V 1K9</td>
    <td className="border">Canada</td>
  </tr>
  <tr>
    <td className="border importantBis">2019-02</td>
    <td className="border">{startDate}</td>
    <td className="border">8323 Rue Isaac Lexton</td>
    <td className="border">Londre</td>
    <td className="border">Angleterre</td>
    <td className="border">W1S 2XH</td>
    <td className="border">Angleterre</td>
  </tr>
  </tbody>
</table>
          </Typography>
        </AccordionDetails>
      </Accordion>

</div>


    <br/>  <p>{!isValidFormatAdress && (
  <span style={{ color: 'red' }}>La date doit être au format AAAA-MM</span>
)}</p>

<br/>  <p>{endDateErrorMessage && (
  <span style={{ color: 'red' }}>La deuxième colonne "À (AAAA-MM)" de la dernière ligne du tableau doit correspondre à la période d’aujourdhui soit {todayBis}</span>
)}</p>

    <table className="textColumnSmaller">
      <thead>
        <tr>
          <th>De (AAAA-MM)</th>
          {/* Other header cells */}
          <th>À (AAAA-MM) </th>
            <th>Rue et numéro civique</th>
            <th>Ville</th>
            <th>Province, État ou Disctrict</th>
            <th>Code Postal</th>
            <th>Pays</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {AdresseRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((colName, colIndex) => (
              
              <td key={colIndex}>
              {colName === "De" && rowIndex !== 0 ? (
                <input
                  type="text"
                  value={AdresseRows[rowIndex - 1]["À"]}
                  onChange={(event) => handleInputChangeAdresse(event, rowIndex, colName)}
                  required
                />
              ): 
                
                rowIndex === 0 && colName === "De" ? (
                <input
                  type="text"
                  value= {todayBis}
                  onChange={(event) => handleInputChangeAdresse(event, rowIndex, colName)}
                  required
                />
              ) :
              rowIndex !== 0 && colName === "À" ? (
                <input
                  type="text"
                  required
                   onChange={(event) => {
                    setEndDateErrorMessageAdress(false)
               const newValue = event.target.value;
               
              if (newValue.match(yyyyMMPattern)) {
                setIsValidFormatAdress(true);
                handleInputChangeAdresse(event, rowIndex, colName);
                if (newValue === startDate) {
                console.log("dans la matrice adress")
                setEndDateAdress(true)
              } else {
                setEndDateAdress(false)
              }
              }else {
                setIsValidFormatAdress(false);
           
             }}}
                />
              ) :
              rowIndex === 0 && colName === "À" ? (
                <input
                  type="text"
                  required
                   onChange={(event) => {
                    setEndDateErrorMessageAdress(false)
               const newValue = event.target.value;
               
              if (newValue.match(yyyyMMPattern)) {
                setIsValidFormatAdress(true);
                handleInputChangeAdresse(event, rowIndex, colName);
                if (newValue === startDate) {
                console.log("dans la matrice adress")
                setEndDateAdress(true)
              } else {
                setEndDateAdress(false)
              }
              }else {
                setIsValidFormatAdress(false);
           
             }}}
                />
              ) 
              :
                (
                  
                  <input
                    type="text"
                    value={row[colName]}
                    onChange={(event) => handleInputChangeAdresse(event, rowIndex, colName)}
                    required
                  />
                )}

             
              </td>
            ))}
           <td>
           {rowIndex === 0 ? null : ( 
                <Button variant="outlined" color="error" size="small" style={{ marginLeft:'5px', fontSize: '8px'}} onClick={() => deleteAdressRow(rowIndex)}>Supprimer Ligne</Button>)}
           </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Button variant="outlined" color="success" size="small" style={{ marginTop:'10px', marginLeft:'5px', fontSize: '12px'}} onClick={addAdressRow}>Ajouter ligne</Button>
  </div>

  </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
       

            <Button sx={{marginBottom : '10%'}} variant="contained" type="submit">
              {activeStep === steps.length - 1 ? 'Soumettre' : 'Suivant '}
            </Button>
          </Box>
        </React.Fragment>

      )
      : null }
    </Box>
</form>
       </div>

















       
    
   

        </div>
    </div>
    </div>


    )
}