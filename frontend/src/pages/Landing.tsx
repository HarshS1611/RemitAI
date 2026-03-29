import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Database, Globe, Code } from "lucide-react"

import { useNavigate } from "react-router-dom"


export default function Landing() {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-background">


      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-8 py-6 border-b border-border">


        <h1 className="text-lg font-semibold tracking-tight">

          RemitAI

        </h1>


        <div className="flex gap-3">


          <Button

            variant="outline"

            onClick={() =>
              window.open(
                "https://github.com/HarshS1611/RemitAI.git",
                "_blank"
              )
            }

            className="gap-2"

          >

            <Code size={16} />

            GitHub

          </Button>


          <Button onClick={() => navigate("/dashboard")}>

            Show Demo

          </Button>


        </div>


      </nav>


      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 py-28 text-center">


        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">

          Modern remittance

          <span className="text-primary">

            {" "}infrastructure

          </span>

        </h1>


        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed mb-10">

          Full-stack payments dashboard built with FastAPI,
          PostgreSQL and Gemini AI for fraud detection.
          Demonstrates scalable architecture for fintech systems.

        </p>


        <div className="flex justify-center gap-4">


          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >

            View Dashboard

            <ArrowRight size={16} />

          </Button>


          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              window.open(
                "https://github.com/HarshS1611/RemitAI.git",
                "_blank"
              )
            }
          >

            View Code

          </Button>


        </div>


      </section>


      {/* FEATURES */}

      <section className="max-w-6xl mx-auto px-6 pb-24">


        <h2 className="text-2xl font-semibold text-center mb-10">

          Key Features

        </h2>


        <div className="grid md:grid-cols-4 gap-6">


          <FeatureCard

            icon={<Zap size={18} />}

            title="Async FastAPI"

            desc="High performance API with async SQLAlchemy"

          />


          <FeatureCard

            icon={<Shield size={18} />}

            title="AI Fraud Detection"

            desc="Gemini LLM risk scoring before execution"

          />


          <FeatureCard

            icon={<Database size={18} />}

            title="Neon PostgreSQL"

            desc="Serverless cloud Postgres database"

          />


          <FeatureCard

            icon={<Globe size={18} />}

            title="Global Payments"

            desc="Multi-currency ready architecture"

          />


        </div>


      </section>


      {/* TECH STACK */}

      <section className="bg-muted py-20">


        <div className="max-w-4xl mx-auto text-center">


          <h2 className="text-2xl font-semibold mb-6">

            Tech Stack

          </h2>


          <div className="flex flex-wrap justify-center gap-3">


            <Badge label="React" />

            <Badge label="Vite" />

            <Badge label="shadcn/ui" />

            <Badge label="FastAPI" />

            <Badge label="SQLAlchemy" />

            <Badge label="PostgreSQL" />

            <Badge label="Gemini AI" />

            <Badge label="JWT Auth" />

            <Badge label="Docker" />


          </div>


        </div>


      </section>


      {/* ARCHITECTURE */}

      <section className="max-w-5xl mx-auto py-20 px-6 text-center">


        <h2 className="text-2xl font-semibold mb-4">

          Architecture Overview

        </h2>


        <p className="text-muted-foreground mb-10">

          React frontend communicates with FastAPI backend secured via JWT.
          Transactions are validated, risk-scored using Gemini AI, and stored
          in Neon PostgreSQL.

        </p>


        <div className="grid md:grid-cols-5 gap-4 text-sm">


          <ArchitectureBlock label="React UI" />

          <ArchitectureBlock label="API Layer" />

          <ArchitectureBlock label="AI Risk Check" />

          <ArchitectureBlock label="ORM" />

          <ArchitectureBlock label="Postgres DB" />


        </div>


      </section>


      {/* FOOTER */}

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">


        Built for full-stack engineering interviews · RemitAI


      </footer>


    </div>

  )

}



function FeatureCard({

  icon,
  title,
  desc

}: any) {

  return (

    <Card>

      <CardContent className="p-6 space-y-2">


        <div className="text-primary">

          {icon}

        </div>


        <h3 className="font-medium">

          {title}

        </h3>


        <p className="text-sm text-muted-foreground">

          {desc}

        </p>


      </CardContent>

    </Card>

  )

}



function Badge({ label }: any) {

  return (

    <div className="border border-border bg-card px-3 py-1 rounded-full text-sm">

      {label}

    </div>

  )

}



function ArchitectureBlock({ label }: any) {

  return (

    <div className="bg-card border border-border rounded-lg py-3">

      {label}

    </div>

  )

}