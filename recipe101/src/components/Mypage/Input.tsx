import styled from "styled-components";

const Inputbox = styled.div`
  flex: 1 0 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
`;
const Label = styled.label`
  flex: 4 0 0;
  padding-top: 10px;
  padding-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
  text-align: right;
  vertical-align: middle;
`;
const Input = styled.input`
  flex: 8 0 0;

  font-size: 15px;
`;
const Box = styled.span`
  flex: 1 0 0;
`;

export default function InputComp({
  label,
  value,
  type,
  placeholder,
  func,
  bfunc = () => {},
}: {
  label: string;
  value: string;
  placeholder: string;
  type: string;
  func: Function;
  bfunc?: Function;
}) {
  return (
    <>
      {label === "image" ? (
        <Inputbox>
          <Box></Box>
          <Label>{`${label}`}</Label>
          <Box></Box>
          <Input type={type} onChange={(e) => func(e.target.files)} />
          <Box></Box>
        </Inputbox>
      ) : (
        <Inputbox>
          <Box></Box>
          <Label>{`${label}`}</Label>
          <Box></Box>
          <Input
            value={value}
            type={type}
            onChange={(e) => func(e.target.value)}
            onBlur={(e) => bfunc(e.target.value)}
            placeholder={placeholder}
            size={10}
          />
          <Box></Box>
        </Inputbox>
      )}
    </>
  );
}
