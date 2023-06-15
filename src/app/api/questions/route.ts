import { readFile, readFileSync, writeFileSync, writeSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import xml2js from 'xml2js';
const questionRegex = /^(\d+)[).\s](.*)$/;
const answerRegex = /^([abc])[\).\s](.*)$/;
function searchForA(obj) {
  const result = [];

  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      if (obj[key].includes('a)')) {
        result.push(obj);
        break;
      }
    } else if (typeof obj[key] === 'object') {
      const found = searchForA(obj[key]);
      if (found.length > 0) {
        result.push(...found);
        break;
      }
    }
  }

  return result;
}
export type questionObj = {disc : string, question : string, a: string, b : string, c: string, answ: string[], number : number}
export async function GET(req: NextRequest) {

  // Extract questions from the XML document
  // function extractQuestions(xmlContent) {
    
  //   const questionNodes = xmlContent['office:document']['office:body'][0]['office:drawing'][0]["draw:page"]
    
  //   const questions :questionObj[]= [];
  //   let logCount = 0
  //   let disc = ''
  //   let discCount = 0

  //   let currentPrefix: string | null = null;
  //   let framesAfterPrefix = 0;

  //   let obj: questionObj = {disc : '', question : '', a: '', b : '', c: '', answ: [], number : 1}
  //   questionNodes.forEach((page, pageIterator)=> {
      
  //     page['draw:frame'].forEach((frame)=>{
        
  //       const text = frame['draw:text-box'][0]['text:p'][0]['text:span'][0]['_'] as string
  //       // console.log('text', text); 
  //       // if(searchForDisciplina(frame) === true){
  //       //   console.log('frame', frame['draw:text-box'][0]['text:p'][0]['text:span'][0]["_"]);
          
  //       // }
        
  //       if(!text) {
  //         return}
  //       if(frame['draw:text-box'][0]['text:p'][0]['text:span'].includes('DISCIPLINA') || frame['draw:text-box'][0]['text:p'][0]['text:span'][0]['_'].includes('DISCIPLINA')){
          
  //         let disc = ''
  //         frame['draw:text-box'][0]['text:p'][0]['text:span'].forEach((temp, i)=> {
  //           if(i !== 0 && temp['_'] !== undefined){
  //             disc += temp['_']
  //           }
  //         })
          
  //         obj.disc = disc
  //         console.log('disc', disc,  discCount);
  //         discCount++

  //         // if(logCount < 20){
  //         //   console.dir(frame, { depth: null });
  //         //   console.log('logCouht', logCount);
            
  //         // }
  //       }

  //       const matchesQuestion = text.match(questionRegex);
  //       if(matchesQuestion){

  //         let number =  Number(matchesQuestion[1])
  //         let question = matchesQuestion[2]
  //         frame['draw:text-box'][0]['text:p'][0]['text:span'].forEach((temp : {}, i: number)=> {
  //           if(i === 0) return
  //           if(temp['_'] === undefined )return
  //           question += temp['_']
  //         })
  //         obj.question = question
  //         obj.number = number
  //       }
  //       const matchesAnswer = text.match(answerRegex)



        
  //       if (matchesAnswer) {
  //         if(matchesAnswer[2].length > 2){

  //           const letter = matchesAnswer[0][0];
            
  //           let answer = matchesAnswer[2]
  //           frame['draw:text-box'][0]['text:p'][0]['text:span'].forEach((temp,i: number)=>{
  //             if(temp && temp['_'] !== undefined ){
  //               answer += temp['_']
  //             }
  //             if(temp &&  temp['$'] && temp['$']['text:style-name'] === 'T7' ){
  //               obj.answ.push(letter)
  //             }
  //           })
  //           if(obj.disc.includes('BAZELE MANAGEMENTULUI')){
  //             console.log('matchesAnswer', matchesAnswer);
  //             console.log('answer', answer)
  //             ;
              
  //           }
  //           obj[letter] = answer
  //           if(letter === 'c'){
  //             questions.push(obj)
  //             obj = {...obj , question : '', a: '', b : '', c: '', answ: [], number : 1}
  //           }
  //         currentPrefix = null

  //         } else {
  //           currentPrefix = matchesAnswer[0];
  //           framesAfterPrefix = 0;
  //         }

  //       }
  //       // Check if the frame contains an answer and there's a stored prefix
  //       else if (currentPrefix !== null) {
  //         framesAfterPrefix++;
  
  //         // If we've checked 10 frames after the prefix and still haven't found the answer text, reset the prefix
  //         if (framesAfterPrefix > 10) {
  //           currentPrefix = null;
  //           framesAfterPrefix = 0;
  //           return;
  //         }
  
  //         const letter = currentPrefix[0];
  
  //         let answer = text;
  //         frame['draw:text-box'][0]['text:p'][0]['text:span'].forEach((temp, i) => {
  //           if (temp && temp['_'] !== undefined && i !== 0) {
  //             answer += temp['_'];
  //           }
  //           if (temp && temp['$'] && temp['$']['text:style-name'] === 'T7') {
  //             obj.answ.push(letter);
  //           }
  //         });
  
  //         if (answer.trim()) {
  //           obj[letter as 'a' | 'b' | 'c'] = answer;
  
  //           // Clear the stored prefix and frame index
  //           currentPrefix = null;
  //           framesAfterPrefix = 0;
  
  //           if (letter === 'c') {
  //             questions.push(obj);
  //             obj = { ...obj, question: '', a: '', b: '', c: '', answ: [], number: 1 };
  //           }
  //       logCount ++
  //     }
  //   }
  //   })
  //   })
      

  //   return questions;
  // }
  

  // const blob = readFileSync('./xml.xml', 'utf-8');

  // const xmlContent = await xml2js.parseStringPromise(blob)
  // const INTREBARI = extractQuestions(xmlContent)
  // writeFileSync(`./intrebari.json`,JSON.stringify(INTREBARI))
  
  const json = readFileSync('./intrebariBUNE.json', 'utf-8')
  const obj = JSON.parse(json)
  console.log('SENDING JSON');
  
  return NextResponse.json({questions : obj})
}