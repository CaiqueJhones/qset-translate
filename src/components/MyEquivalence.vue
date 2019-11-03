<template>
  <q-table
    row-key="id"
    wrap-cells
    title="Avaliação de equivalência"
    :data="data"
    :columns="columns"
    :pagination.sync="pagination"
    :loading="loading"
    @request="onRequest"
    rows-per-page-label="Linhas por página"
    :pagination-label="getPaginationLabel"
    :rows-per-page-options="[1, 5, 10, 20, 0]"
    no-data-label="Sem dados para exibir"
    loading-label="Carregando dados"
    >
    <template v-slot:top="props">
      <div class="col-10 q-table__title">Avaliação de equivalência</div>
      <q-space />
      <q-btn
        flat round dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        class="q-ml-md"
      />
    </template>

    <template v-slot:header-cell-semantic="props">
      <q-th :props="props">
        {{ props.col.label }}
        <span>
          <q-icon name="help" size="1.5em" />
          <q-tooltip
            content-class="bg-teal"
            content-style="font-size: 9pt"
            anchor="top middle"
            self="bottom middle"
            :offset="[0, 0]"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            Refere-se à correspondência gramatical dos termos utilizados, à equivalência do significado das palavras.
          </q-tooltip>
        </span>
      </q-th>
    </template>

    <template v-slot:header-cell-idiomatic="props">
      <q-th :props="props">
        {{ props.col.label }}
        <span>
          <q-icon name="help" size="1.5em" />
          <q-tooltip
            content-class="bg-teal"
            content-style="font-size: 9pt"
            anchor="top middle"
            self="bottom middle"
            :offset="[0, 0]"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            Refere-se à dificuldade na tradução de expressões coloquiais, ou seja, avalia se itens de difícil tradução foram adaptados por uma expressão equivalente que não tenha mudado o significado cultural.
          </q-tooltip>
        </span>
      </q-th>
    </template>

    <template v-slot:header-cell-experiential="props">
      <q-th :props="props">
        {{ props.col.label }}
        <span>
          <q-icon name="help" size="1.5em" />
          <q-tooltip
            content-class="bg-teal"
            content-style="font-size: 9pt"
            anchor="top middle"
            self="bottom middle"
            :offset="[0, 0]"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            Refere-se aos conceitos utilizados como adequados ao novo contexto cultural, utilização de termos coerentes com a experiência vivida pela população brasileira.
          </q-tooltip>
        </span>
      </q-th>
    </template>

    <template v-slot:header-cell-conceptual="props">
      <q-th :props="props">
        {{ props.col.label }}
        <span>
          <q-icon name="help" size="1.5em" />
          <q-tooltip
            content-class="bg-teal"
            content-style="font-size: 9pt"
            anchor="top middle"
            self="bottom middle"
            :offset="[0, 0]"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            Refere-se à manutenção do conceito do instrumento original, se determinadas palavras ou expressões possuem significado conceitual semelhante.
          </q-tooltip>
        </span>
      </q-th>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="original" :props="props" class="text-justify">
          {{ props.row.original }}
        </q-td>
        <q-td key="translate" :props="props" class="text-justify">
          {{ props.row.translate }}
        </q-td>

        <q-td key="semantic" :props="props">
          <div class="row q-gutter-md">
            <q-radio
              dense
              v-model="props.row.semantic"
              val="I_AGREE"
              label="Concordo"
              class="col-12"
              color="teal" />
            <q-radio
              dense
              v-model="props.row.semantic"
              val="I_DO_NOT_AGREE"
              label="Não concordo"
              class="col-12"
              color="teal" />
          </div>
        </q-td>
        <q-td key="semanticComment" :props="props">
          <span v-if="showComment(props.row.semantic, props.row.semanticComment)">
            {{ props.row.semanticComment }}
          </span>
          <span class="text-caption" v-else-if="props.row.semantic === 'I_DO_NOT_AGREE'">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.semanticComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="props.row.semantic === 'I_DO_NOT_AGREE'"
          >
            <q-input type="textarea" v-model="props.row.semanticComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

        <q-td key="idiomatic" :props="props">
          <div class="row q-gutter-md">
            <q-radio
              dense
              v-model="props.row.idiomatic"
              val="I_AGREE"
              label="Concordo"
              class="col-12"
              color="teal"
            />
            <q-radio
              dense
              v-model="props.row.idiomatic"
              val="I_DO_NOT_AGREE"
              label="Não concordo"
              class="col-12"
              color="teal"
            />
          </div>
        </q-td>
        <q-td key="idiomaticComment" :props="props">
          <span v-if="showComment(props.row.idiomatic, props.row.idiomaticComment)">
            {{ props.row.idiomaticComment }}
          </span>
          <span class="text-caption" v-else-if="props.row.idiomatic === 'I_DO_NOT_AGREE'">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.idiomaticComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="props.row.idiomatic === 'I_DO_NOT_AGREE'"
          >
            <q-input type="textarea" v-model="props.row.idiomaticComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

        <q-td key="experiential" :props="props">
          <div class="row q-gutter-md">
            <q-radio
              dense
              v-model="props.row.experiential"
              val="I_AGREE"
              label="Concordo"
              class="col-12"
              color="teal"
            />
            <q-radio
              dense
              v-model="props.row.experiential"
              val="I_DO_NOT_AGREE"
              label="Não concordo"
              class="col-12"
              color="teal"
            />
          </div>
        </q-td>
        <q-td key="experientialComment" :props="props">
          <span v-if="showComment(props.row.experiential, props.row.experientialComment)">
            {{ props.row.experientialComment }}
          </span>
          <span class="text-caption" v-else-if="props.row.experiential === 'I_DO_NOT_AGREE'">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.experientialComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="props.row.experiential === 'I_DO_NOT_AGREE'"
          >
            <q-input type="textarea" v-model="props.row.experientialComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

        <q-td key="conceptual" :props="props">
          <div class="row q-gutter-md">
            <q-radio
              dense
              v-model="props.row.conceptual"
              val="I_AGREE"
              label="Concordo"
              class="col-12"
              color="teal"
            />
            <q-radio
              dense
              v-model="props.row.conceptual"
              val="I_DO_NOT_AGREE"
              label="Não concordo"
              class="col-12"
              color="teal"
            />
          </div>
        </q-td>
        <q-td key="conceptualComment" :props="props">
          <span v-if="showComment(props.row.conceptual, props.row.conceptualComment)">
            {{ props.row.conceptualComment }}
          </span>
          <span class="text-caption" v-else-if="props.row.conceptual === 'I_DO_NOT_AGREE'">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.conceptualComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="props.row.conceptual === 'I_DO_NOT_AGREE'"
          >
            <q-input type="textarea" v-model="props.row.conceptualComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

      </q-tr>
    </template>

  </q-table>
</template>
<script>
import qItemService from 'services/q-item-service'
import judgeService from 'services/judge-service'
import { notifySuccess, notifyError, notifyWarn } from 'services/notify'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'original',
          label: 'Original',
          align: 'left',
          field: 'original',
          sortable: false
        },
        {
          name: 'translate',
          align: 'left',
          label: 'Tradução',
          field: 'calories',
          sortable: false
        },
        {
          name: 'semantic',
          align: 'left',
          label: 'Equivalência Semântica',
          field: 'semantic',
          sortable: false
        },
        {
          name: 'semanticComment',
          align: 'left',
          label: 'Comentários',
          field: 'semanticComment',
          sortable: false
        },
        {
          name: 'idiomatic',
          align: 'left',
          label: 'Equivalência Idiomática',
          field: 'idiomatic',
          sortable: false
        },
        {
          name: 'idiomaticComment',
          align: 'left',
          label: 'Comentários',
          field: 'idiomaticComment',
          sortable: false
        },
        {
          name: 'experiential',
          align: 'left',
          label: 'Equivalência Experencial',
          field: 'experiential',
          sortable: false
        },
        {
          name: 'experientialComment',
          align: 'left',
          label: 'Comentários',
          field: 'experientialComment',
          sortable: false
        },
        {
          name: 'conceptual',
          align: 'left',
          label: 'Equivalência Conceitual',
          field: 'conceptual',
          sortable: false
        },
        {
          name: 'conceptualComment',
          align: 'left',
          label: 'Comentários',
          field: 'conceptualComment',
          sortable: false
        }
      ],

      data: []
    }
  },
  computed: {
    ...mapGetters('user', ['isAdministrator', 'isJudge'])
  },
  methods: {
    async load () {
      this.onRequest({ pagination: this.pagination })
    },
    async onRequest (props) {
      let { page, rowsPerPage } = props.pagination
      this.loading = true

      try {
        const fetchCount = rowsPerPage === 0 ? await qItemService.count() : rowsPerPage
        const result = await qItemService.list(fetchCount, page - 1)
        this.data = result.content.map(item => {
          return {
            id: item.id,
            original: item.textOriginal,
            translate: item.textTranslated,
            semantic: null,
            semanticComment: '',
            idiomatic: null,
            idiomaticComment: '',
            experiential: null,
            experientialComment: '',
            conceptual: null,
            conceptualComment: ''
          }
        })

        if (this.isJudge) {
          const answers = await judgeService.getEquivalences()
          answers.forEach(ans => {
            this.data.filter(item => item.id === ans.item.id).forEach(item => {
              item.semantic = ans.semantics
              item.semanticComment = ans.semanticsComment
              item.idiomatic = ans.idiomatic
              item.idiomaticComment = ans.idiomaticComment
              item.experiential = ans.experiential
              item.experientialComment = ans.experientialComment
              item.conceptual = ans.conceptual
              item.conceptualComment = ans.conceptualComment
            })
          })
        }

        this.pagination.page = result.number + 1
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.rowsNumber = result.totalElements

        this.loading = false
      } catch (error) {
        notifyError(error)
      }
    },
    async onSave () {
      if (this.isAdministrator) {
        notifyWarn('Você é um administrador, não pode salvar aqui!')
        return
      }
      try {
        const dt = this.data.map(item => {
          return {
            itemId: item.id,
            semantics: item.semantic,
            semanticsComment: item.semanticComment,
            idiomatic: item.idiomatic,
            idiomaticComment: item.idiomaticComment,
            experiential: item.experiential,
            experientialComment: item.experientialComment,
            conceptual: item.conceptual,
            conceptualComment: item.conceptualComment
          }
        })
        await judgeService.saveEquivalences(dt)
        notifySuccess('Progresso salvo!')
      } catch (error) {
        notifyError(error)
      }
    },
    async onNext () {
      if (this.isAdministrator) {
        this.$emit('next')
        return
      }
      try {
        await this.onSave()
        const complete = await judgeService.equivalenceComplete()
        if (complete) {
          this.$emit('next')
        }
      } catch (error) {
        notifyError(error)
      }
    },
    getPaginationLabel (firstRowIndex, endRowIndex, totalRowsNumber) {
      return `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`
    },
    showComment (value, comment) {
      return value === 'I_DO_NOT_AGREE' && comment !== null && comment !== ''
    }
  }
}
</script>
