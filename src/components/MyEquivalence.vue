<template>
  <q-table
    row-key="name"
    wrap-cells
    title="Avaliação de equivalência"
    :data="data"
    :columns="columns"
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
            content-class="bg-primary"
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
            content-class="bg-primary"
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
            content-class="bg-primary"
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
            content-class="bg-primary"
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
            <q-radio dense v-model="props.row.semantic" :val="true" label="Concordo" class="col-12" />
            <q-radio dense v-model="props.row.semantic" :val="false" label="Não concordo" class="col-12" />
          </div>
        </q-td>
        <q-td key="semanticComment" :props="props">
          <span v-if="!props.row.semantic"> {{ props.row.semanticComment }} </span>
          <span class="text-caption" v-if="!props.row.semantic && props.row.semanticComment === ''">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.semanticComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="!props.row.semantic"
          >
            <q-input type="textarea" v-model="props.row.semanticComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

        <q-td key="idiomatic" :props="props">
          <div class="row q-gutter-md">
            <q-radio dense v-model="props.row.idiomatic" :val="true" label="Concordo" class="col-12" />
            <q-radio dense v-model="props.row.idiomatic" :val="false" label="Não concordo" class="col-12" />
          </div>
        </q-td>
        <q-td key="idiomaticComment" :props="props">
          <span v-if="!props.row.idiomatic"> {{ props.row.idiomaticComment }} </span>
          <span class="text-caption" v-if="!props.row.idiomatic && props.row.idiomaticComment === ''">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.idiomaticComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="!props.row.idiomatic"
          >
            <q-input type="textarea" v-model="props.row.idiomaticComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

        <q-td key="experiential" :props="props">
          <div class="row q-gutter-md">
            <q-radio dense v-model="props.row.experiential" :val="true" label="Concordo" class="col-12" />
            <q-radio dense v-model="props.row.experiential" :val="false" label="Não concordo" class="col-12" />
          </div>
        </q-td>
        <q-td key="experientialComment" :props="props">
          <span v-if="!props.row.experiential"> {{ props.row.experientialComment }} </span>
          <span class="text-caption" v-if="!props.row.experiential && props.row.experientialComment === ''">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.experientialComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="!props.row.experiential"
          >
            <q-input type="textarea" v-model="props.row.experientialComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

        <q-td key="conceptual" :props="props">
          <div class="row q-gutter-md">
            <q-radio dense v-model="props.row.conceptual" :val="true" label="Concordo" class="col-12" />
            <q-radio dense v-model="props.row.conceptual" :val="false" label="Não concordo" class="col-12" />
          </div>
        </q-td>
        <q-td key="conceptualComment" :props="props">
          <span v-if="!props.row.conceptual"> {{ props.row.conceptualComment }} </span>
          <span class="text-caption" v-if="!props.row.conceptual && props.row.conceptualComment === ''">
            Faça um comentário
          </span>
          <q-popup-edit
            v-model="props.row.conceptualComment"
            title="Comentar"
            buttons
            label-set="OK"
            label-cancel="Cancelar"
            v-if="!props.row.conceptual"
          >
            <q-input type="textarea" v-model="props.row.conceptualComment" dense autofocus counter />
          </q-popup-edit>
        </q-td>

      </q-tr>
    </template>

    <template v-slot:bottom>
    </template>
  </q-table>
</template>
<script>
export default {
  data () {
    return {
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

      data: [
        {
          original: '1. Innovative teaching is recognised at the division of nursing.',
          translate: '1. O ensino inovador é reconhecido na área da saúde.',
          semantic: null,
          semanticComment: '',
          idiomatic: null,
          idiomaticComment: '',
          experiential: null,
          experientialComment: '',
          conceptual: null,
          conceptualComment: ''
        },
        {
          original: '1. Innovative teaching is recognised at the division of nursing.',
          translate: '1. O ensino inovador é reconhecido na área da saúde.',
          semantic: null,
          semanticComment: '',
          idiomatic: null,
          idiomaticComment: '',
          experiential: null,
          experientialComment: '',
          conceptual: null,
          conceptualComment: ''
        }
      ]
    }
  }
}
</script>
