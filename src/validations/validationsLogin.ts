const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpPhone = /^([0-9]{2})([0-9]{8,9})$/;

export class Validation {

  static Login(email: string, password: string): boolean {
    if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
      throw new Error('Informe um email válido');
    }
    if (!password || password.length < 6) {
      throw new Error('Informe uma senha com no mínimo de 6 digitos');
    }
    return true;
  }

  static Credential(name: string, email: string, phone: string, password: string, confirmpassword: string): boolean {
    if (!name || name.length < 4) {
      throw new Error('Informe um nome com no mínimo de 4 caractéries');
    }
    if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
      throw new Error('Informe um email válido');
    }
    if (!phone || !(regExpPhone.test(phone.replace(/\D/g, '')))) {
      throw new Error('Informe um telefone válido');
    }
    if (!password || password.length < 6) {
      throw new Error('Informe uma senha com no mínimo de 6 digitos');
    }
    if (!password || !confirmpassword || password != confirmpassword) {
      throw new Error('A senha não é igual a conformação da senha');
    }
    return true;
  }
  
  static CredentialUpdate(name: string, email: string, phone: string): boolean {
    if (!name || name.length < 4) {
      throw new Error('Informe um nome com no mínimo de 4 caractéries');
    }
    if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
      throw new Error('Informe um email válido');
    }
    if (!phone || !(regExpPhone.test(phone.replace(/\D/g, '')))) {
      throw new Error('Informe um telefone válido');
    }
    return true;
  }

  static CredentialPassword(email: string, password: string, newPassword: string, confirmpassword: string): boolean {
    if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
      throw new Error('Informe um email válido');
    }
    if (!password || password.length < 6) {
      throw new Error('Informe sua senha atual');
    }
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Informe uma nova senha com no mínimo de 6 digitos');
    }
    if (!newPassword || !confirmpassword || newPassword != confirmpassword) {
      throw new Error('A senha não é igual a conformação da senha');
    }
    return true;
  }
  
}
