import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";

import {Font} from '@react-pdf/renderer';




const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
   

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  
  },
});

const PDFFile = (props) => {

    console.log("321 " + JSON.stringify(props))
    console.log("this is the name " + props.customProp.forms[0].questions.question)
  const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  

  const myID = props.myID;
 

let myIndice = -1 // Initialize with a value indicating not found

const formsArray = props.customProp.forms;

/* for (let i = 0; i < formsArray.length; i++) {
  if (formsArray[i]._id === myID && formsArray[i].name  === myID ) {
    myIndice = i;
    break;
  } */
//}
for (let i = 0; i < formsArray.length; i++) {
  if (formsArray[i].name === props.formName  ) {
    myIndice = i;
    break;
  }
}

if (myIndice === -1) {
  // Handle the case when the ID is not found
  return <Text>ID not found</Text>;
}

console.log("myIndice:", myIndice);

  return (
    <Document>
  <Page>
    {props.customProp.forms[myIndice].questions.map((question, index) =>
      question.answer === "" ? null : (
        <Text key={index} style={styles.text}>
          {question.question} : <Text style={{ color: 'red' }}>{question.answer}</Text> 

         
            {question.period.map((periodItem, periodIndex) => (
              <Text key={periodIndex} style={styles.period}>  
              {'\n'} {'\n'} Period {periodIndex + 1}: De  {periodItem.De} -  {periodItem.À} {'\n'}
                {periodItem.Activité && (
                  <>
                    Activité : {periodItem.Activité} {'\n'}
                  </>
                )}
                {periodItem.Organisation && (
                  <>
                    Nom de l'organisation : {periodItem.Organisation} {'\n'}
                  </>
                )}
                {periodItem.ActivitéOrganisation && (
                  <>
                    Activité de l'organisation : {periodItem.ActivitéOrganisation} {'\n'}
                  </>
                )}
                {periodItem.SphèreCompétence && (
                  <>
                  Sphère de Compétence : {periodItem.SphèreCompétence} {'\n'}
                  </>
                )}
                {periodItem.Service && (
                  <>
                  Service : {periodItem.Service} {'\n'}
                  </>
                )}
                {periodItem.ActivitésOrPoste && (
                  <>
                  Activités/Poste : {periodItem.ActivitésOrPoste} {'\n'}
                  </>
                )}
                {periodItem.SecteurDeService && (
                  <>
                  Secteur De Service : {periodItem.SecteurDeService} {'\n'}
                  </>
                )}
                {periodItem.NumeroUnite && (
                  <>
                  Numero Unite : {periodItem.NumeroUnite} {'\n'}
                  </>
                )}
                {periodItem.NomCommandant && (
                  <>
                  Nom Commandant : {periodItem.NomCommandant} {'\n'}
                  </>
                )}
                {periodItem.Grade && (
                  <>
                  Grade : {periodItem.Grade} {'\n'}
                  </>
                )}
                {periodItem.DateCombatActif && (
                  <>
                  Date Combat Actif : {periodItem.DateCombatActif} {'\n'}
                  </>
                )}
                {periodItem.LieuCombatActif && (
                  <>
                  Lieu Combat Actif : {periodItem.LieuCombatActif} {'\n'}
                  </>
                )}
                {periodItem.RaisonFinService && (
                  <>
                  Raison Fin Service : {periodItem.RaisonFinService} {'\n'}
                  </>
                )}
                {periodItem.TypeOrganisation && (
                  <>
                    Type d'organisation : {periodItem.TypeOrganisation} {'\n'}
                  </>
                )}
                {periodItem.RueEtNuméroCivique && (
                  <>
                  Rue Et NuméroCivique : {periodItem.RueEtNuméroCivique} {'\n'}
                  </>
                )}
                {periodItem.Statut && (
                  <>
                    Statut : {periodItem.Statut} {'\n'}
                  </>
                )}
                {periodItem.Diplome && (
                  <>
                    Diplome : {periodItem.Diplome} {'\n'}
                  </>
                )}
                {periodItem.ChampsEtude && (
                  <>
                    Champs Étude : {periodItem.ChampsEtude} {'\n'}
                  </>
                )}
                {periodItem.Ville && (
                  <>
                  Ville : {periodItem.Ville} {'\n'}
                  </>
                )}


              

                {periodItem.Province && (
                  <>
                  Province  : {periodItem.Province} {'\n'}
                  </>
                )}
                {periodItem.CodePostal && (
                  <>
                  Code Postal : {periodItem.CodePostal} {'\n'}
                  </>
                )}

                {periodItem.Pays && (
                  <>
                  Pays : {periodItem.Pays} {'\n'}
                  </>
                )}

                {periodItem.NomEntreprise || periodItem.NomEtablissement  && (
                  <>
                  Nom Institution : {periodItem.NomEntreprise}  {periodItem.NomEtablissement}{'\n'}
                  </>
                )}
               
         
               
          
                
              </Text>
      ))}
            
          
            
    {/*       {question.period[0].Diplome !== undefined && question.period === undefined ? (
          question.period.map((periodItem, periodIndex) => (
            <Text key={periodIndex} style={styles.period}>
              Period {periodIndex + 1}: {periodItem.De} - {periodItem.À} {'\n'}
              Nom de l'établissement : {periodItem.NomEtablissement} {'\n'}
              Ville : {periodItem.Ville} {'\n'}
              Pays : {periodItem.Pays} {'\n'}
              Diplome : {periodItem.Diplome} {'\n'}
              Champ d'étude : {periodItem.ChampsEtude} {'\n'}
              {'\n'}
              {'\n'}
            </Text>
          ))):null} */}
        </Text>
      )
    )}
  </Page>
</Document>
  );
};

export default PDFFile;