const Contact = () => {
  return (
    <ul className="mt-32 w-96 rounded-lg p-8" style={{ background: '#0369a1' }}>
      <li>
        <span className="bold text-xl text-white">Adres: </span>
        <span>Ul. Testowa 420, Test, 00-000</span>
      </li>
      <li className="mt-4">
        <span className="bold text-xl text-white">Telefon: </span>
        <span>000-000-000</span>
      </li>
      <li className="mt-4">
        <span className="bold text-xl text-white">Email: </span>
        <span>test@test.pl</span>
      </li>
    </ul>
  );
};

export default Contact;
