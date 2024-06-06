import {
  useFormik
} from 'formik';
import {
  useEffect
} from 'react';
import {
  useCookies
} from 'react-cookie';
import APISupply from '../services/api-tanks';
import tankValidationSchema from '../validations/tankValidation';

const useTankForm = (props) => {
  const [cookies] = useCookies(['mr-token']);

  const formik = useFormik({
    initialValues: {
      name: '',
      identify: '',
      description: '',
      capacity: 0,
      reservoir: 0,
    },
    validationSchema: tankValidationSchema,
    onSubmit: async (values) => {
      if (props.tank && props.tank.uuid) {
        await handleUpdateTank(values);
      } else {
        await handleNewTank(values);
      }
    },
  });

  useEffect(() => {
    if (props.tank) {
      formik.setValues({
        name: props.tank.name || '',
        identify: props.tank.identify || '',
        description: props.tank.description || '',
        capacity: props.tank.capacity || 0,
        reservoir: props.tank.reservoir || 0,
      });
    }
  }, [props.tank]);

  const handleUpdateTank = async (values) => {
    await APISupply.updateTank(props.tank.uuid, values, cookies['mr-token'])
      .then(async () => {
        const newTank = await APISupply.getTank(
          props.tank.uuid,
          cookies['mr-token']
        );
        props.updateTank(newTank);
      })
      .catch((err) => console.log(err));
  };

  const handleNewTank = async (values) => {
    await APISupply.createTank(values, cookies['mr-token'])
      .then(async (response) => {
        await APISupply.getTank(response.uuid, cookies['mr-token'])
          .then((response) => props.newTank(response))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return formik;
};

export default useTankForm;
