import React, { useState, useContext, useEffect, ChangeEvent } from 'react'
import {
  Backdrop,
  CircularProgress,
  ButtonBase,
  Box,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  Dialog,
  Slide,
} from '@mui/material'
import { CandidateCardComponent, VoteCounterCard } from '../components'
import {
  StyledList,
  StyledTextField,
  StyledListItem,
  StyledTitleTypography,
  StyledVotingBox,
  StyledVerifyBtn, // Make sure to import StyledVerifyBtn from the correct location
} from '../styles/stylesVotes'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import CloseIcon from '@mui/icons-material/Close'
import { StyledRadio } from '../styles/candidateStyle'
import { StyledSuccessBox } from '../styles/newElectionStyle'
import CancelIcon from '@mui/icons-material/Cancel'
import {
  AuthorityContext,
  AuthorityContextType,
} from '../context/AuthorityContext'

const Votes = () => {
  const {
    selectedElectionData,
    getElectionCandidate,
    selectedElectionCandidate,
    giveVoteCall,
    voteCountStatus,
    setVoteCountStatus,
    isGivingVoteProcessLoading,
  }: AuthorityContextType = useContext(AuthorityContext)

  const {
    electionId,
    electionName,
    startTime,
    endTime,
  }: {
    electionId?: string
    electionName?: string
    startTime?: number
    endTime?: number
  } = selectedElectionData || {}

  const safeStartTime = startTime as number
  const safeEndTime = endTime as number

  const candidateArray: any[] = selectedElectionCandidate || []

  const [inputHash, setInputHash] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)
  const currentTimestamp = Date.now()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCandidateHash, setSelectedCandidateHash] = useState('')

  useEffect(() => {
    if (typeof electionId === 'number' && electionId >= 0) {
      getElectionCandidate?.(electionId ?? undefined)
    }
  }, [electionId])

  useEffect(() => {
    if (voteCountStatus) {
      setIsOpen(false)
    }
  }, [voteCountStatus])

  const handleOnVerifyBtnClick = () => {
    if (!inputHash) {
      setErrorStatus(true)
      return
    }
    setIsOpen(true)
    setErrorStatus(false)
  }

  const handleInputFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputHash(e.target.value.trim())
  }

  const handleOnCloseBtn = () => {
    setIsOpen(false)
  }

  const handleOnSubmitBtn = () => {
    console.log('Values before validation:', {
      electionId,
      inputHash,
      selectedCandidateHash,
    })

    if (
      electionId !== undefined &&
      inputHash !== undefined &&
      selectedCandidateHash !== undefined
    ) {
      const parsedElectionId =
        typeof electionId === 'number' ? electionId : parseInt(electionId, 10)
      const parsedCandidateHash =
        typeof selectedCandidateHash === 'number'
          ? selectedCandidateHash
          : parseInt(selectedCandidateHash, 10)

      console.log('Parsed values:', {
        parsedElectionId,
        inputHash,
        parsedCandidateHash,
      })

      // 여기서 타입이 정의되지 않은 문제가 있을 수 있습니다.
      giveVoteCall?.(parsedElectionId, inputHash, parsedCandidateHash)
    } else {
      console.error('Invalid values for vote call:', {
        electionId,
        inputHash,
        selectedCandidateHash,
      })
      // 또는 오류 처리 로직을 추가하세요.
    }
  }

  const handleNotificationCancel = () => {
    setVoteCountStatus(false)
  }

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Grid container justifyContent="center">
          <Grid item xs={5}>
            <StyledVotingBox>
              <StyledTitleTypography>
                Cast your vote for {electionName}
              </StyledTitleTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <StyledTextField
                  onChange={handleInputFieldChange}
                  value={inputHash}
                  error={errorStatus}
                  placeholder="Enter your hash.."
                  disabled={
                    safeStartTime > currentTimestamp ||
                    safeEndTime < currentTimestamp
                  }
                />

                <StyledVerifyBtn
                  disabled={
                    safeStartTime > currentTimestamp ||
                    safeEndTime < currentTimestamp
                  }
                  onClick={handleOnVerifyBtnClick}
                >
                  확인
                </StyledVerifyBtn>
              </Box>
              <StyledList>
                <ListItem>
                  <Box
                    sx={{
                      color: 'red',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1,
                      alignItems: 'center',
                    }}
                  >
                    <WarningAmberRoundedIcon sx={{ fontSize: 50 }} />
                    <Typography fontWeight="bold" variant="h5">
                      주의사항
                    </Typography>
                  </Box>
                </ListItem>
                {/* ... (existing code) */}
              </StyledList>
            </StyledVotingBox>
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', margin: 'auto' }}>
            {candidateArray.length === 0 && (
              <Typography>No data Found</Typography>
            )}

            {endTime !== undefined &&
              endTime < currentTimestamp &&
              candidateArray.length > 0 && (
                <>
                  <Grid container spacing={10} justifyContent="center">
                    {candidateArray.map((candidate: any, index: number) => {
                      const {
                        votes,
                        name: candidateName,
                        symbolImg,
                      } = candidate || {}

                      return (
                        <Grid key={index} item>
                          <VoteCounterCard
                            key={index}
                            candidateName={candidateName}
                            symbolImage={symbolImg}
                            votes={votes}
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
                </>
              )}

            {endTime !== undefined && endTime > currentTimestamp && (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'orange',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  After the voting hours are over, the result will be announced.
                </Typography>
              </>
            )}
          </Grid>
        </Grid>

        <Dialog open={isOpen}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Box
              sx={{
                marginBottom: 3,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: 'white' }}
              >
                Please Select Candidate to Vote
              </Typography>
              <CloseIcon
                onClick={handleOnCloseBtn}
                sx={{ cursor: 'pointer', color: 'white' }}
              />
            </Box>

            {candidateArray.map((candidate: any, index: number) => {
              const {
                name: candidateName,
                hash,
                symbolName,
                symbolImg,
              } = candidate || {}

              return (
                <Box
                  key={index}
                  sx={{
                    marginTop: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderRadius: 2,
                    boxShadow: '1px 0px 11px black',
                  }}
                >
                  <ButtonBase
                    onClick={() => {
                      setSelectedCandidateHash(hash)
                    }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: 2,
                    }}
                    component="div"
                  >
                    <StyledRadio checked={hash === selectedCandidateHash} />
                    <CandidateCardComponent
                      candidateName={candidateName}
                      symbolName={symbolName}
                      symbolImg={symbolImg}
                    />
                  </ButtonBase>
                </Box>
              )
            })}

            <Button
              sx={{
                marginTop: 10,
                color: 'white',
                bgcolor: 'red',
                padding: 1,
                '&:hover': {
                  bgcolor: 'rgb(223, 32, 32)',
                },
              }}
              onClick={handleOnSubmitBtn}
            >
              Submit
            </Button>
          </Box>
        </Dialog>
      </Box>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) =>
            Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
        }}
        open={isGivingVoteProcessLoading || false}
      >
        <CircularProgress sx={{ color: 'gray' }} />
      </Backdrop>
      <Slide direction="up" in={voteCountStatus} mountOnEnter unmountOnExit>
        <StyledSuccessBox>
          <Typography color="white">Successful</Typography>
          <CancelIcon
            onClick={handleNotificationCancel}
            sx={{ cursor: 'pointer' }}
          />
        </StyledSuccessBox>
      </Slide>
    </>
  )
}

export default Votes
