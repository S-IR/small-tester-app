const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");

pdfjsLib.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

export async function getTextWithColor(pdfPath: string) {
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
  
    const numPages = pdf.numPages;
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
  
      for (const item of content.items) {
        const text = item.str;
        const color = item.transform.slice(4, 7);
        console.log(`Text: ${text}, Color: ${color}`);
      }
    }

  }
  
export function parseText(text:string) {
    const disciplinePattern = /DISCIPLINA: (.*?)(?=DISCIPLINA:|$)/g;
    const questionPattern = /(\d+)\. (.*?)(?=a\.)/;
    const answerPattern = /([a-d])\. (.*?)(?=[a-d]\.|$)/g;
  
    const disciplines = Array.from(text.matchAll(disciplinePattern));
  
    const parsedData = disciplines.map(disciplineMatch => {
      const discipline = disciplineMatch[1].trim();
  
      const questions = disciplineMatch[0]
        .split("\n")
        .filter((line: string) => questionPattern.test(line))
        .map((line) => {
            const match = line.match(questionPattern);
            if(!match) {
                throw new Error('NO questionPattern found')
                
            }
        const [questionNumber, questionText] = match
          const answers = Array.from(line.matchAll(answerPattern)).map(
            ([, answerLetter, answerText]) => ({
              letter: answerLetter,
              text: answerText,
              isCorrect: answerText.includes("underlined and written in purple"),
            })
          );
  
          return {
            questionNumber: parseInt(questionNumber, 10),
            questionText,
            answers,
          };
        });
  
      return {
        discipline,
        questions,
      };
    });
  
    return parsedData;
  }
  