import React from 'react'
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
function Add() {
  const animal = [
    {value:1,
    label:"perro"},
    {value:2,
      label:"gato"},
      {value:3,
        label:"oso"},
  ]
  return (
    <div>
      <div class="w-full">
      <h1 class="text-2xl font-semibold">Agregar Agencia</h1>
      <div class="md:flex mt-4 space-x-4  justify-center">
        <div class="bg-white gap-2 p-4 rounded-xl">
        <form class="max-w-sm mx-auto">
        <Select
      isRequired
      label="Favorite Animal"
      placeholder="Select an animal"
      defaultSelectedKeys={["cat"]}
      className="max-w-xs"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
        </form>
        </div>
        <div class="bg-white gap-2 p-4 rounded-xl">
          <p class="text-lg text-black">How to do Basic Jumping and how to landing safely</p>
        </div>

      </div>
      <div className='bg-white gap-1 p-4 rounded-xl mt-5'>
        <p className='text-black'>
          asdasdsad
        </p>
      </div>
      </div>

    </div>
  )
}

export default Add