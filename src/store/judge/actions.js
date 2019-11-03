import { notifyError } from 'services/notify'
import judgeService from 'services/judge-service'

export async function loadJudge ({ commit }) {
  try {
    const judge = await judgeService.details()
    commit('setJudge', judge)
  } catch (error) {
    notifyError(error, 'Não foi possível obter o perfil do usuário')
    throw error
  }
}

export async function acceptTerm ({ commit }) {
  try {
    const judge = await judgeService.acceptTerm()
    commit('setJudge', judge)
  } catch (error) {
    notifyError(error)
    throw error
  }
}

export async function saveDescription ({ commit }, dados) {
  try {
    const judge = await judgeService.saveDescription(dados)
    commit('setJudge', judge)
  } catch (error) {
    notifyError(error)
    throw error
  }
}

export async function saveOpinion ({ commit }, opinion) {
  try {
    const judge = await judgeService.saveOpinion(opinion)
    commit('setJudge', judge)
  } catch (error) {
    notifyError(error)
    throw error
  }
}

export async function finishSurvey ({ commit }) {
  try {
    const judge = await judgeService.finishSurvey()
    commit('setJudge', judge)
  } catch (error) {
    notifyError(error)
    throw error
  }
}
