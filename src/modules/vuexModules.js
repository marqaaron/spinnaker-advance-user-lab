import LayoutModule from '@/core/layout/store/layout';
import AuthenticationModule from '@/modules/authentication/store/authentication';
import MainMenuModule from "@/core/layout/components/mainMenu/store/mainMenu";
import PipelineExpressionTesterModule from "@/modules/pipelineExpressionTester/store/pipelineExpressionTester";
import DocumentationModule from "@/modules/documentation/store/documentation";
import SharedModule from "@/modules/shared/store/shared";

export default {
  layout: LayoutModule,
  authentication: AuthenticationModule,
  mainMenu: MainMenuModule,
  pipelineExpressionTester: PipelineExpressionTesterModule,
  documentation: DocumentationModule,
  shared: SharedModule
}
