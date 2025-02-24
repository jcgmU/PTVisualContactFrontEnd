"use client";
import React, { useState, useContext } from "react"; // Añadir useContext
import { createCustomer } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalContext from "@/context/GlobalContext"; // Importar GlobalContext

export default function CreateCustomerForm({ onCancel }) {
  const { refreshCustomers } = useContext(GlobalContext); // Obtener refreshCustomers
  // Estados
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    waitTime: 0, // Añadimos waitTime al estado inicial
  });
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState("success");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(formData);
      await refreshCustomers(); // Actualizar la lista después de crear
      setDialogType("success");
      setShowDialog(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDialogType("error");
      setShowDialog(true);
    }
  };

  const handleDialogClose = (retry = false) => {
    setShowDialog(false);
    if (dialogType === "success") {
      onCancel();
    } else if (retry) {
      setError(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <h3 className="text-lg font-bold">Crear Nuevo Cliente</h3>
        {error && <p className="text-red-500">{error}</p>}

        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <Input
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <Input
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Teléfono</span>
          <Input
            name="phone"
            type="tel"
            placeholder="+34 123456789"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Tiempo de espera (segundos)
          </span>
          <Input
            name="waitTime"
            type="number"
            placeholder="Ej. 30"
            value={formData.waitTime}
            onChange={handleChange}
            className="mt-1"
            min="0"
            required
          />
        </label>

        <div className="flex space-x-4">
          <Button type="submit">Crear</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === "success"
                ? "¡Cliente Creado!"
                : "Error al Crear Cliente"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogType === "success"
                ? "El cliente se ha creado exitosamente."
                : `No se pudo crear el cliente. ${error} Por favor, inténtalo nuevamente.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleDialogClose(false)}>
              {dialogType === "success" ? "Cerrar" : "Cancelar"}
            </AlertDialogCancel>
            {dialogType === "error" && (
              <AlertDialogAction onClick={() => handleDialogClose(true)}>
                Intentar de nuevo
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
