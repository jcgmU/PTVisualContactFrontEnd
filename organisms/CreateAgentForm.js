"use client";
import React, { useState } from "react";
import { createAgent } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function CreateAgentForm({ onCancel }) {
  // Estados
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    waitTime: 0,
  });
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState("success"); // "success" o "error"

  // Definimos las opciones de estado
  const statusOptions = [
    { value: "ACTIVE", label: "Activo" },
    { value: "INACTIVE", label: "Inactivo" },
    { value: "PENDING", label: "Pendiente" },
  ];

  // Modificamos el handleChange para manejar el select
  const handleChange = (e) => {
    if (e?.target) {
      // Para inputs normales
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      // Para el select
      setFormData({ ...formData, status: e });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAgent(formData);
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
      onCancel(); // Cierra el formulario en caso de éxito
    } else if (retry) {
      setError(null); // Limpia el error para reintentar
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        {/* Título del formulario */}
        <h3 className="text-lg font-bold">Crear Nuevo Agente</h3>

        {/* Mensaje de error si existe */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Campo para el nombre del agente */}
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <Input
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
          />
        </label>

        {/* Campo para el estado del agente */}
        <label className="block">
          <span className="text-sm font-medium">Estado</span>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleChange(value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecciona un estado" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        {/* Campo para el tiempo de espera */}
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
          />
        </label>

        {/* Botones de acción */}
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
                ? "¡Agente Creado!"
                : "Error al Crear Agente"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogType === "success"
                ? "El agente se ha creado exitosamente."
                : `No se pudo crear el agente. ${error} Por favor, inténtalo nuevamente.`}
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
