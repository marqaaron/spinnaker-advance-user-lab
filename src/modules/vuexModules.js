import LayoutModule from '@/core/layout/store/layout';
import AuthenticationModule from '@/modules/authentication/store/authentication';
import MainMenuModule from "@/core/layout/components/mainMenu/store/mainMenu";
import PipelineExpressionTester from "@/modules/pipelineExpressionTester/store/pipelineExpressionTester";

export default {
  layout: LayoutModule,
  authentication: AuthenticationModule,
  mainMenu: MainMenuModule,
  pipelineExpressionTester: PipelineExpressionTester
}
