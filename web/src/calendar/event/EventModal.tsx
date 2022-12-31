import React, { useCallback, useEffect, useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Skeleton from "@mui/material/Skeleton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTheme, Theme } from "@mui/material/styles";

import { fetchMaters } from "../../functions/fetchMasters";
import { LegacyDataProvider, useDataProvider } from "react-admin";

import classes from "./event.module.css";
import { fetchServices } from "../../functions/fetchServices";
import { IService } from "../../interfaces";
import { parseCombinedValue } from "../../utils/eventUtils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ServicesChooseProps {
  services: Array<IService>;
  loading: boolean;
  service: Array<string>;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  theme: Theme;
}

interface IEventModal {
  open: boolean;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getStyles = (name: string, service: readonly string[], theme: Theme) => {
  return {
    fontWeight:
      service.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const renderMasterSelect = ({
  loading = false,
  masters = [],
  master = "",
  onChange = (event: SelectChangeEvent) => {},
}) => {
  if (loading || !masters.length) {
    return (
      <Box className={classes.input}>
        <Skeleton variant="rectangular" width="100%" height={48} />
      </Box>
    );
  }

  return (
    <FormControl fullWidth margin="dense">
      <InputLabel id="masters-label">Майстри</InputLabel>
      <Select
        labelId="masters-label"
        id="masters-select"
        value={master}
        onChange={onChange}
      >
        <MenuItem value="">
          <em>-- Будь який --</em>
        </MenuItem>
        {masters.map(({ id, name }) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Виберіть майстра або залиште поле вільним</FormHelperText>
    </FormControl>
  );
};

const renderServices = ({
  services = [],
  loading = false,
  service,
  onChange,
  theme,
}: ServicesChooseProps) => {
  if (!services.length || loading) {
    return (
      <Box className={classes.input}>
        <Skeleton variant="rectangular" width="100%" height={48} />
      </Box>
    );
  }

  return (
    <FormControl fullWidth margin="dense">
      {/*<InputLabel id="services-label">Послуги</InputLabel>*/}
      <Select
        // labelId="services-label"
        id="multiple-services"
        label="Послуги"
        multiple
        value={service}
        onChange={onChange}
        input={<OutlinedInput id="multiple-services" />}
        renderValue={(selected: string[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => {
              const [id, name] = parseCombinedValue(value);
              return (
                <Chip
                  key={id}
                  label={name}
                  sx={{
                    backgroundColor: "#94C14E",
                    color: "#fff",
                  }}
                />
              );
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {services.map(({ id, name, price }) => (
          <MenuItem
            key={id}
            value={`${id}&${name}&${price}`}
            style={getStyles(name, service, theme)}
          >
            {`${name} - ${price} грн`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Виберіть що саме вам потрібно</FormHelperText>
    </FormControl>
  );
};

export const EventModal = ({ open, onClose }: IEventModal) => {
  const dataProvider = useDataProvider();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);
  const [masters, setMasters] = useState([]);
  const [master, setMaster] = useState("");
  const [services, setServices] = useState<Array<IService>>([]);
  const [chosenServices, setChosenServices] = useState<string[]>([]);

  const totalPrice = useMemo(() => {
    return chosenServices.reduce((acc, value) => {
      const [, , price] = parseCombinedValue(value);

      return acc + Number(price);
    }, 0);
  }, [chosenServices]);

  const handleMasterChange = useCallback(
    (event: SelectChangeEvent) => setMaster(event.target.value),
    []
  );

  const handleChosenServices = useCallback(
    (event: SelectChangeEvent<typeof chosenServices>) => {
      const {
        target: { value },
      } = event;
      setChosenServices(typeof value === "string" ? value.split(",") : value);
    },
    []
  );

  useEffect(() => {
    setLoading(true);

    (async () => {
      const masters = await fetchMaters(
        (dataProvider as unknown) as LegacyDataProvider
      );
      const services = await fetchServices(
        (dataProvider as unknown) as LegacyDataProvider
      );

      setMasters(masters);
      setServices(services);
      setLoading(false);
    })();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Зробити запис
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Виберіть зручний для Вас час, мастера та послуги
        </DialogContentText>
        {renderMasterSelect({
          loading,
          masters,
          master,
          onChange: handleMasterChange,
        })}
        {renderServices({
          loading,
          services,
          theme,
          service: chosenServices,
          onChange: handleChosenServices,
        })}
        <p className={classes.totalPrice}>Загальна вартість: {totalPrice}</p>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose as () => {}}>
          Закрити
        </Button>
        <Button variant="contained" color="success">
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
};
