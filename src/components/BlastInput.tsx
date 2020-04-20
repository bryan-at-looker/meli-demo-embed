import React, { useState, useEffect } from 'react';
import { InputText, IconButton, Flex } from '@looker/components';

export function BlastInput({ setSelected, c }:any) {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    setValue(c?.input?.value)
  }, [])

  const handleClick = () => {
    let new_object = {...c}
    new_object.input.value = value
    setSelected(new_object)
  }

  return (
    <Flex mt="small" alignItems="center">
      <InputText
        placeholder={c.placeholder}
        onChange={(v) => { setValue(v.target.value) }}
        width='100%'
      ></InputText>
      <IconButton onClick={handleClick} size="medium" icon="FindSelected" color="primary" label=''/>
    </Flex>
  );
}
