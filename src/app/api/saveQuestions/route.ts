import { readFile, readFileSync, writeFileSync, writeSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import xml2js from "xml2js";
const questionRegex = /^(\d+)[).\s](.*)$/;
const answerRegex = /^([abc])[\).\s](.*)$/;
export type questionObj = {
  disc: string;
  question: string;
  a: string;
  b: string;
  c: string;
  answ: string[];
  number: number;
};
export async function POST(req: NextRequest) {
  const { intrebari } = await req.json();
  const json = JSON.stringify(intrebari);

  writeFileSync(`./intrebariSLABE${Math.random()}.json`, json);

  return NextResponse.json({ message: " done" }, { status: 200 });
}
