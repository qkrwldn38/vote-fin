import React, { useContext, ChangeEvent, useState } from 'react'
import {
  Grid,
  Typography,
  ListItemText,
  Backdrop,
  CircularProgress,
  Slide,
} from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  StyledChildBox,
  StyledList,
  StyledListItem,
  StyledSubmitBtn,
  StyledSuccessBox,
  StyledTextField,
  StyledTypography,
} from '../styles/newElectionStyle'
import { AuthorityContext, Election } from '../context/AuthorityContext'

function NewElection() {
  const { isBallotInitialized, isBallotLoading, initializeBallot } =
    useContext(AuthorityContext)

  const [electionState, setElectionState] = useState<Election>({
    name: '',
    startTime: null as unknown as number,
    endTime: null as unknown as number,
  })

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target
    setElectionState({
      ...electionState,
      [name]: value,
    })
  }

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = e.target
    const dateValue = new Date(value)
    setElectionState({
      ...electionState,
      [field]: dateValue.getTime() as unknown as number,
    })
  }

  const handleOnSubmitBtn = () => {
    initializeBallot(electionState)
  }

  return (
    <>
      <Grid sx={{ justifyContent: 'space-around', paddingTop: 8 }} container>
        <Grid item md={12}>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              paddingBottom: 10,
            }}
            variant="h5"
          >
            Initialize Ballot
          </Typography>
        </Grid>
        <Grid item mx={6}>
          <StyledList>
            <StyledListItem sx={{ listStyle: 'none' }}>
              <WarningAmberRoundedIcon sx={{ fontSize: 70, color: 'red' }} />
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: 'red' }}
              >
                주의사항
              </Typography>
            </StyledListItem>
            <StyledListItem>
              <ListItemText>
                투표를 초기화하기 전에 반드시 확인하시기 바랍니다
              </ListItemText>
            </StyledListItem>
            <StyledListItem>
              <ListItemText>확인후 수정이 불가합니다</ListItemText>
            </StyledListItem>
            <StyledListItem>
              <ListItemText>
                승인된 사람만이 투표용지를 초기화할 수 있는 권한이 있습니다
              </ListItemText>
            </StyledListItem>
          </StyledList>
        </Grid>
        <Grid item mx={6}>
          <StyledChildBox>
            <StyledTypography>투표 주제</StyledTypography>
            <StyledTextField
              value={electionState.name}
              autoComplete="off"
              name="name"
              onChange={handleNameChange}
              placeholder="투표 주제를 입력하세요"
              type="text"
            />
          </StyledChildBox>
          <StyledChildBox>
            <StyledTypography>
              투표 시작 날짜 및 시간을 입력하시오
            </StyledTypography>
            <StyledTextField
              name="startTime"
              onChange={(e) => handleTimeChange(e, 'startTime')}
              type="datetime-local"
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
            />
          </StyledChildBox>
          <StyledChildBox>
            <StyledTypography>
              투표 마감 날짜 및 시간을 입력하시오
            </StyledTypography>
            <StyledTextField
              onChange={(e) => handleTimeChange(e, 'endTime')}
              name="endTime"
              type="datetime-local"
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
            />
          </StyledChildBox>
          <StyledSubmitBtn onClick={handleOnSubmitBtn}>
            완료?등록?
          </StyledSubmitBtn>
        </Grid>
      </Grid>

      <Slide direction="up" in={isBallotInitialized} mountOnEnter unmountOnExit>
        <StyledSuccessBox>
          <Typography color={'white'}>Successful</Typography>
          <CancelIcon sx={{ cursor: 'pointer' }} />
        </StyledSuccessBox>
      </Slide>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBallotLoading}
      >
        <CircularProgress sx={{ color: 'gray' }} />
      </Backdrop>
    </>
  )
}

export default NewElection
