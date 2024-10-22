import axios from "axios";

export const routineInfoapi = async (
  routineId: string | undefined,
  setroutineInfo: Function
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_DOMAIN}/routine/getroutine`,
      { routineId }
    );

    setroutineInfo(response.data.routine);
  } catch (error) {
    console.error("Error fetching routine info:", error);
    throw error;
  }
};
