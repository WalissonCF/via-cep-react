import { useState } from 'react'

import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react';

import { ServiceCEP } from './serviceCep';
import { Address } from './Address.model';
import './App.css'

function App() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address>();

  const handleSearch = async () => {
    try {
      const service = new ServiceCEP();
      const addressData = await service.getAddressByCEP(cep);
      setAddress(addressData);
    } catch (error) {
      setAddress({} as Address);
    }
  };

  return (
    <>
      <div>
        {/* <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
        <Button>Button</Button>
        <button onClick={handleSearch}>Buscar Endereço</button>
        {address && (
          <div>
            <p>CEP: {address.cep}</p>
            <p>Logradouro: {address.logradouro}</p>
            <p>Bairro: {address.bairro}</p>
          </div>
        )} */}
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Endereço
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type='number' label="CEP" value={cep} size="lg" onChange={(e) => setCep(e.target.value)} crossOrigin={undefined} />
            <Input label="Bairro" size="lg" value={address?.bairro} disabled crossOrigin={undefined} />
            <Input label="localidade" size="lg" value={address?.localidade} disabled crossOrigin={undefined} />
            <Input label="Logradouro" size="lg" value={address?.logradouro} disabled crossOrigin={undefined} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleSearch} variant="gradient" fullWidth>
              Buscar endereço
            </Button>
          </CardFooter>
        </Card>
      </div>

    </>
  );
}

export default App
