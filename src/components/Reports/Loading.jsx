import { CircularProgress, FormControl, FormLabel, Skeleton, Stack, Typography } from "@mui/material";


function Loading(text="Cargando") {
  return (
    <FormControl>
      <Stack spacing="2">
        <CircularProgress
         />
        
       
      </Stack>
    </FormControl>
  );
}

export default Loading;