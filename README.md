# Alkalmazás futtatása Dockerrel (Linux)

Ez a dokumentum bemutatja, hogyan tudod elindítani és leállítani az alkalmazást Dockerrel egy Linux rendszeren, az \`env.js\` segédfájl használatával.

## Előfeltételek

A futtatáshoz az alábbiak szükségesek:

- **Linux operációs rendszer**
- **Docker** telepítve és futtatva  
   Ellenőrzés:  
  ```
    docker --version
  ```
- **docker-compose** telepítve  
   Ellenőrzés:  
  ```
  docker-compose --version
  ```

Ha ezek nincsenek telepítve, először telepítsd őket a disztribúciód csomagkezelőjével vagy a Docker hivatalos leírása alapján.

## Környezeti változók – \`.env\` fájl

Az alkalmazás megfelelő működéséhez szükség van egy **\`.env\`** fájlra a projekt gyökerében.  
Ebben kell megadni többek között:

### Stripe kulcsok a fizetéshez:
- \`STRIPE_SECRET_KEY\`
- \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`

**Példa**:
```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
```

### Adatbázis beállítások

Az adatbázishoz szükséges környezeti változók szintén a \`.env\` fájlban szerepelnek, **de ezek neveit a \`docker-compose.yml\` fájlban tudod ellenőrizni vagy módosítani.**

Lépések:
1. Nyisd meg a \`docker-compose.yml\` fájlt.
2. Keresd meg az adatbázishoz kapcsolódó szolgáltatás(oka)t.
3. Ellenőrizd az ott megadott környezeti változókat (pl. \`DB_HOST\`, \`DB_USER\`, \`DB_PASSWORD\`, \`DB_NAME\` stb.).
4. Add meg őket a \`.env\` fájlban.

**Példa:**
```env
DB_HOST=db
DB_USER=app_user
DB_PASSWORD=valami_jelszo
DB_NAME=app_database
```

---

## \`env.js\` futtatható fájl

Az alkalmazás indítása és kezelése az **\`env.js\`** futtatható fájlon keresztül történik, amely **csak Linuxon fut**.

Győződj meg róla, hogy a fájl futtatható:

```bash
chmod +x env.js
```

Ezután az alábbi parancsokkal tudod használni (a projekt gyökérkönyvtárából):

### Alkalmazás indítása és belépés a webalkalmazás konténer shelljébe
```
./env.js run
```
- Elindítja a konténereket
- Beléptet a webalkalmazás konténer shelljébe

### Build + futtatás
```
./env.js run --build
```
- Újraépíti az image-eket
- Elindítja a konténereket
- Beléptet a webalkalmazás konténer shelljébe

### Futó konténerek listázása (status)
```bash
./env.js status
```
- Gyakorlatilag a \`docker ps\`-t hívja  
- Visszaadja a futó konténereket

### Minden leállítása
```bash
./env.js down
```
- Leállítja a docker-compose által indított konténereket

---


## Rövid összefoglaló

1. Telepítsd a **Docker**-t és a **docker-compose**-t Linuxon.
2. Állítsd be a futtathatóságot az \`env.js\` fájlon:  
   ```bash
   chmod +x env.js
   ```
3. Töltsd ki a \`.env\` fájlt (Stripe + adatbázis adatok).
4. Indítás:  
   ```bash
   ./env.js run
   ```
5. Új build:  
   ```bash
   ./env.js run --build
   ```
6. Állapot lekérdezése:  
   ```bash
   ./env.js status
   ```
7. Leállítás:  
   ```bash
   ./env.js down
   ```

