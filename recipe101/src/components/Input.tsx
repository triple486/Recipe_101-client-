import styled from "styled-components";

const Inputbox = styled.div`
  flex: 1 0 0;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const Label = styled.label`
  flex: 4 0 0;
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
  label = "",
  value,
  type = "text",
  func = () => {},
  bfunc = () => {},
  placeholder,
  size = 12,
}: {
  label?: string;
  value?: string;
  type?: string;
  func?: Function;
  bfunc?: Function;
  placeholder?: string;
  size?: number;
}) {
  return (
    <>
      <Inputbox>
        <Box></Box>
        <Label>{`${label}`}</Label>
        <Box></Box>
        <Input
          value={value}
          type={type}
          onChange={(e) => func(e.target.value)}
          onBlur={(e) => bfunc(e.target.value)}
          size={size}
          placeholder={placeholder || ""}
        />
        <Box></Box>
      </Inputbox>
    </>
  );
}
