'use client'

import { useState, useEffect } from "react";
import PriceChangeModal from "./PriceChangeModal";
import Button from "@/components/Button";

export default function PriceCard({ value, color }: { value: number; color?: string }) {
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState(value)

  useEffect(() => {
    setPrice(value)
  }, [value])

  console.log(price, value)

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between flex-row">
          <h2 className="card-header">Ár / Éjszaka</h2>
          <Button variant='primary' outline onClick={() => setOpen(true)} text='Ár módosítása' />
        </div>
        <p className={`text-3xl font-bold ${color || ''}`}>
          {price} <span className="text-sm font-normal text-content2">Ft/éj</span>
        </p>
      </div>
      <PriceChangeModal open={open} setOpen={setOpen} setPrice={setPrice} price={price} />
    </div>
  );
}