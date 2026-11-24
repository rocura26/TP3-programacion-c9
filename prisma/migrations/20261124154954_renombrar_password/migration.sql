-- Renombra la columna conservando los datos (los hashes de las contraseñas)
ALTER TABLE "User" RENAME COLUMN "password" TO "passwordHash";
