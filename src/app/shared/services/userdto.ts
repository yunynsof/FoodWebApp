export interface AuthResponse {

          id: number,
          email: string,
          username: string,
          firstname: string,
          lastname: string,
          isVerified: boolean,
          verifyToken: string,
          verifyExpires: string,
          verifyChanges: any,
          resetToken: string,
          resetExpires: string,
          createdAt: string,
          updatedAt: string,
          deletedAt: string

    }
