<template>
    <collapse-item setting-name="Titel">
    <title-text></title-text>
    <title-align></title-align>
    <title-vertical-align></title-vertical-align>
  </collapse-item>
    <collapse-item setting-name="Subtitel">
    <subtitle-text></subtitle-text>
    <subtitle-align></subtitle-align>
    <subtitle-vertical-align></subtitle-vertical-align>
  </collapse-item>
    <collapse-item setting-name="Diagramm">
      <inverse-axis></inverse-axis>
    </collapse-item>
  <div v-if="chartType !== 'pie'">
    <collapse-item setting-name="X-Achse">
      <x-axis-title-text></x-axis-title-text>
      <x-axis-opposite></x-axis-opposite>
      <x-axis-reversed></x-axis-reversed>
    </collapse-item>
    <collapse-item setting-name="Y-Achse">
      <y-axis-title-text></y-axis-title-text>
      <y-axis-opposite></y-axis-opposite>
      <y-axis-reversed></y-axis-reversed>
    </collapse-item>
  </div>
    <collapse-item setting-name="Plotoptionen">
      <enabled-markers></enabled-markers>
      <enable-data-labels></enable-data-labels>
      <div v-if="chartType === 'column'">
        <column-color-by-point></column-color-by-point>
      </div>
    </collapse-item>
    <collapse-item setting-name="Serien">
  <div class="mb-3">
    <select id="series_select" class="form-select" v-model="selected">
      <option v-for="(data, index) in series" :value="index" :key="data.name + index"> {{ data.name }}</option>
    </select>
  </div>
  <div v-if="chartType === 'line'">
    <line-color :selected="selected"></line-color>
    <line-dash-style :selected="selected"></line-dash-style>
    <line-marker-symbol :selected="selected"></line-marker-symbol>
  </div>
  <div v-if="chartType === 'column'">
    <column-color :selected="selected"></column-color>
  </div>
  <div v-if="chartType === 'area'">
    <area-color :selected="selected"></area-color>
    <area-dash-style :selected="selected"></area-dash-style>
    <area-marker-symbol :selected="selected"></area-marker-symbol>
  </div>
  <div v-if="chartType === 'pie'">
    <pie-color :selected="selected"></pie-color>
  </div>
</collapse-item>
    <collapse-item setting-name="Legende">
      <enable-legend></enable-legend>
      <legend-layout></legend-layout>
      <legend-align></legend-align>
      <legend-vertical-align></legend-vertical-align>
    </collapse-item>
    <collapse-item setting-name="Tooltip">
      <tooltip-enabled></tooltip-enabled>
      <tooltip-shared v-if="chartType !== 'pie'"></tooltip-shared>
      <tooltip-background-color></tooltip-background-color>
      <tooltip-border-width></tooltip-border-width>
      <tooltip-border-radius></tooltip-border-radius>
      <tooltip-border-color></tooltip-border-color>
    </collapse-item>
    <collapse-item setting-name="Credits">
      <credits-enabled></credits-enabled>
      <credits-text></credits-text>
      <credits-link></credits-link>
    </collapse-item>
    <collapse-item setting-name="Bildbeschriftung">
    <caption-text></caption-text>
  </collapse-item>
</template>

<script>
  import {computed, ref} from 'vue';
  import { useStore } from 'vuex';
  import CollapseItem from "../form/CollapseItem";
  import TitleText from "../../highcharts/options/title/TitleText";
  import TitleAlign from "../../highcharts/options/title/TitleAlign";
  import TitleVerticalAlign from "../../highcharts/options/title/TitleVerticalAlign";
  import SubtitleText from "../../highcharts/options/subtitle/SubtitleText";
  import SubtitleAlign from "../../highcharts/options/subtitle/SubtitleAlign";
  import SubtitleVerticalAlign from "../../highcharts/options/subtitle/SubtitleVerticalAlign";
  import InverseAxis from "../../highcharts/options/chart/InverseAxis";
  import XAxisTitleText from "../../highcharts/options/xAxis/title/XAxisTitleText";
  import XAxisOpposite from "../../highcharts/options/xAxis/XAxisOpposite";
  import XAxisReversed from "../../highcharts/options/xAxis/XAxisReversed";
  import YAxisTitleText from "../../highcharts/options/yAxis/title/YAxisTitleText";
  import YAxisOpposite from "../../highcharts/options/yAxis/YAxisOpposite";
  import YAxisReversed from "../../highcharts/options/yAxis/YAxisReversed";
  import LineColor from "../../highcharts/options/series/line/LineColor";
  import LineDashStyle from "../../highcharts/options/series/line/LineDashStyle";
  import LineMarkerSymbol from "../../highcharts/options/series/line/marker/LineMarkerSymbol";
  import ColumnColorByPoint from "../../highcharts/options/plotOptions/column/ColumnColorByPoint";
  import ColumnColor from "../../highcharts/options/series/column/ColumnColor";
  import EnableDataLabels from "../../highcharts/options/plotOptions/series/dataLabels/EnableDataLabels";
  import EnabledMarkers from "../../highcharts/options/plotOptions/series/marker/EnabledMarkers";
  import AreaColor from "../../highcharts/options/series/area/AreaColor";
  import AreaMarkerSymbol from "../../highcharts/options/series/area/marker/AreaMarkerSymbol";
  import AreaDashStyle from "../../highcharts/options/series/area/AreaDashStyle";
  import PieColor from "../../highcharts/options/series/pie/PieColor";
  import EnableLegend from "../../highcharts/options/legend/EnableLegend";
  import LegendLayout from "../../highcharts/options/legend/LegendLayout";
  import LegendAlign from "../../highcharts/options/legend/LegendAlign";
  import LegendVerticalAlign from "../../highcharts/options/legend/LegendVerticalAlign";
  import TooltipEnabled from "../../highcharts/options/tooltip/TooltipEnabled";
  import TooltipBorderColor from "../../highcharts/options/tooltip/TooltipBorderColor";
  import TooltipBorderRadius from "../../highcharts/options/tooltip/TooltipBorderRadius";
  import TooltipBorderWidth from "../../highcharts/options/tooltip/TooltipBorderWidth";
  import TooltipShared from "../../highcharts/options/tooltip/TooltipShared";
  import TooltipBackgroundColor from "../../highcharts/options/tooltip/TooltipBackgroundColor";
  import CreditsEnabled from "../../highcharts/options/credits/CreditsEnabled";
  import CreditsText from "../../highcharts/options/credits/CreditsText";
  import CreditsLink from "../../highcharts/options/credits/CreditsLink";
  import CaptionText from "../../highcharts/options/caption/CaptionText";
  export default {
    components: {
      ColumnColor,
      CollapseItem, TitleAlign, TitleText, TitleVerticalAlign,
      SubtitleText, SubtitleAlign, SubtitleVerticalAlign, InverseAxis,
      XAxisTitleText, XAxisOpposite, XAxisReversed, YAxisTitleText,
      YAxisOpposite, YAxisReversed, LineColor, LineDashStyle, LineMarkerSymbol, EnableDataLabels,
      EnabledMarkers, ColumnColorByPoint, AreaMarkerSymbol, AreaDashStyle, AreaColor, PieColor,
      EnableLegend, LegendLayout, LegendAlign, LegendVerticalAlign, TooltipShared, TooltipEnabled,
      TooltipBackgroundColor, TooltipBorderRadius, TooltipBorderColor, TooltipBorderWidth, CreditsEnabled,
      CreditsText, CreditsLink, CaptionText

    },
    setup(){
        const store = useStore();
        const selected = ref(0);
      const series = computed(function () { return store.getters.highChartsOptions.series })
      const selectedSeries = computed(function () { return store.getters.highChartsOptions.series[selected.value] })
      const chartType = computed(function () {
        return store.getters.highChartsOptions.chart?.type;
      });

      return { series, selected, selectedSeries, chartType }
    }
  }
</script>