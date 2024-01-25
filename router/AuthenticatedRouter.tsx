import AuthCheckWrapper from './AuthCheckWrapper';
import RouterStacks from './RouterStacks';

const AuthenticatedRouter = () => (
    <AuthCheckWrapper>{RouterStacks()}</AuthCheckWrapper>
);

export default AuthenticatedRouter;
