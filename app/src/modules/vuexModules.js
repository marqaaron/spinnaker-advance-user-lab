import LayoutModule from '@/core/layout/store/layout';
import AuthenticationModule from '@/modules/authentication/store/authentication';
import MainMenuModule from "@/core/layout/components/mainMenu/store/mainMenu";
import PipelineExpressionTesterModule from "@/modules/pipelineExpressionTester/store/pipelineExpressionTester";
import DocumentationModule from "@/modules/documentation/store/documentation";
import SharedModule from "@/modules/shared/store/shared";
import ReleasesModule from "@/modules/releases/store/releases";
import AppConfigModule from "@/modules/appConfig/store/appConfig";
import PipelinesInsights from "@/modules/pipelinesInsights/store/pipelinesInsights";

export default {
  layout: LayoutModule,
  authentication: AuthenticationModule,
  mainMenu: MainMenuModule,
  pipelineExpressionTester: PipelineExpressionTesterModule,
  documentation: DocumentationModule,
  shared: SharedModule,
  releases: ReleasesModule,
  appConfig: AppConfigModule,
  pipelineInsights: PipelinesInsights
}
